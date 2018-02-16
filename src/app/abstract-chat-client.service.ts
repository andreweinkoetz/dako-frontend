import { Injectable } from '@angular/core';
import { ChatService } from './chat-client.service';
import { ChatPdu } from './chat-pdu';
import { ClientConversationStatus } from './client-conversation-status.enum';
import { ChatClientInterface } from './chat-client-interface';
import { Pdutype } from './pdutype.enum';
import { Subject, BehaviorSubject } from 'rxjs';

// Service zur Repräsentation gemeinsamer Funktionalität der Impl. Varianten
@Injectable()
export abstract class AbstractChatClientService implements ChatClientInterface {

  // Status des Benutzers
  protected status: ClientConversationStatus = ClientConversationStatus.UNREGISTERED;

  // Benutzername
  protected userName: string;

  // Event-Emitter für neue ChatPDUs
  protected messageEvent = new Subject<ChatPdu>();
  messageEvent$ = this.messageEvent.asObservable();

  // Event-Emitter für Änderungen in der Benutzerliste
  public userListEvent = new BehaviorSubject<ChatPdu>(undefined);
  userListEvent$ = this.userListEvent.asObservable();

  // Event-Emitter bei Fehlern
  protected loginErrorEvent = new Subject<number>();
  loginErrorEvent$ = this.loginErrorEvent.asObservable();

  // Konstruktor mit DI
  constructor(protected clientService: ChatService) {
    clientService.messages.subscribe(pdu => {
      console.log("Response from websocket: " + pdu.getPdutype());
      this.handleIncomingPdu(pdu);
    });
  }

  public setUserName(userName: string) {
    this.userName = userName;
  }

  public getUserName(): string {
    return this.userName;
  }

  // Verarbeitung einer Änderung der Benutzerliste
  handleUserListEvent(receivedPdu: ChatPdu) {
    this.userListEvent.next(receivedPdu);
  }

  // Meldet Benutzer ab
  public logout(userName: string) {
    this.status = ClientConversationStatus.UNREGISTERING;
    var requestPdu: ChatPdu = ChatPdu.createLogoutRequestPdu(userName, this.status);
    this.send(requestPdu);
  }

  // Schließt die WebSocket-Verbindung zwischen Client und Server
  // Wird automatisch wieder aufgebaut.
  public reconnect() {
    this.clientService.close();
  }

  // Sendet Nachricht an Benutzer
  public tell(userName: string, message: string) {
    var requestPdu: ChatPdu = new ChatPdu();
    requestPdu.setPduType(Pdutype.CHAT_MESSAGE_REQUEST);
    requestPdu.setClientStatus(ClientConversationStatus.REGISTERED);
    requestPdu.setUserName(userName);
    requestPdu.setMessage(message);
    this.send(requestPdu);
    console.log("Chat-Message-Request-PDU fuer Client " + name
      + " an Server gesendet, Inhalt: " + message);
  }

  // Verarbeitet eintreffende PDUs
  abstract handleIncomingPdu(receivedPdu: ChatPdu);

  // Verarbeitet eintreffende Message-Events
  abstract chatMessageEventAction(receivedPdu: ChatPdu);

  // Verarbeitet eintreffende Login-Events
  abstract loginEventAction(receivedPdu: ChatPdu);

  // Verarbeitet eintreffende Logout-Events
  abstract logoutEventAction(receivedPdu: ChatPdu);

  // Verarbeitet eintreffende Message-Responses
  abstract chatMessageResponseAction(receivedPdu: ChatPdu);

  // Verarbeitet eintreffende Login-Responses
  abstract loginResponseAction(receivedPdu: ChatPdu);

  // Sendet eine ChatPDU über ClientService
  send(pdu: ChatPdu) {
    this.clientService.messages.next(pdu);
  }

  // Führt einen Login-Request durch
  loginRequest(userName: string) {
    console.log("Sending Request...");
    this.status = ClientConversationStatus.REGISTERING;
    this.userName = userName;
    var pdu = ChatPdu.createLoginRequestPdu(userName);
    this.send(pdu);
  }

  // Verarbeitet eine Logout-Response
  logoutResponseAction(receivedPdu: ChatPdu) {
    this.status = ClientConversationStatus.UNREGISTERED;
    sessionStorage.clear();
    window.location.reload();
  }

}
