import { Injectable } from '@angular/core';
import { ChatClientService } from './chat-client.service';
import { ChatPdu } from './chat-pdu';
import { ClientConversationStatus } from './client-conversation-status.enum';
import { ChatClientInterface } from './chat-client-interface';
import { Pdutype } from './pdutype.enum';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export abstract class AbstractChatClientService implements ChatClientInterface {

  protected status: ClientConversationStatus = ClientConversationStatus.UNREGISTERED;

  protected userName: string;

  protected messageEvent = new Subject<ChatPdu>();
  messageEvent$ = this.messageEvent.asObservable();

  public userListEvent = new BehaviorSubject<ChatPdu>(undefined);
  userListEvent$ = this.userListEvent.asObservable();

  protected loginErrorEvent = new Subject<number>();
  loginErrorEvent$ = this.loginErrorEvent.asObservable();

  constructor(protected clientService: ChatClientService) {
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

  handleUserListEvent(receivedPdu: ChatPdu) {
    this.userListEvent.next(receivedPdu);
  }

  public logout(userName: string) {
    this.status = ClientConversationStatus.UNREGISTERING;
    var requestPdu: ChatPdu = ChatPdu.createLogoutRequestPdu(userName, this.status);
    this.send(requestPdu);
  }

  public reconnect() {
    this.clientService.close();
  }

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

  abstract handleIncomingPdu(receivedPdu: ChatPdu);

  abstract chatMessageEventAction(receivedPdu: ChatPdu);

  abstract loginEventAction(receivedPdu: ChatPdu);

  abstract logoutEventAction(receivedPdu: ChatPdu);

  abstract chatMessageResponseAction(receivedPdu: ChatPdu);

  abstract loginResponseAction(receivedPdu: ChatPdu);

  send(pdu: ChatPdu) {
    this.clientService.messages.next(pdu);
  }

  loginRequest(userName: string) {
    console.log("Sending Request...");
    this.status = ClientConversationStatus.REGISTERING;
    this.userName = userName;
    var pdu = ChatPdu.createLoginRequestPdu(userName);
    this.send(pdu);
  }

  logoutResponseAction(receivedPdu: ChatPdu) {
    this.status = ClientConversationStatus.UNREGISTERED;
    sessionStorage.clear();
    window.location.reload();
  }

}
