import { Injectable } from '@angular/core';
import { ChatClientService } from './chat-client.service';
import { ChatPdu } from './chat-pdu';
import { ClientConversationStatus } from './client-conversation-status.enum';
import { ChatClientInterface } from './chat-client-interface';
import { Pdutype } from './pdutype.enum';
import { Subject } from 'rxjs';

@Injectable()
export abstract class AbstractChatClientService implements ChatClientInterface {

  protected messageEvent = new Subject<ChatPdu>();
  messageEvent$ = this.messageEvent.asObservable();

  constructor(protected clientService: ChatClientService) {
    clientService.messages.subscribe(pdu => {
      console.log("Response from websocket: " + pdu.getPdutype());
      console.table(pdu.getClients());
      this.handleIncomingPdu(pdu);
    });
  }

  public tell(userName: string, message: string) {
    var requestPdu: ChatPdu = new ChatPdu();
    requestPdu.setPduType(Pdutype.CHAT_MESSAGE_REQUEST);
    requestPdu.setClientStatus(ClientConversationStatus.REGISTERED);
    requestPdu.setUserName(userName);
    requestPdu.setMessage(message);
    this.send(requestPdu);
    console.debug("Chat-Message-Request-PDU fuer Client " + name
      + " an Server gesendet, Inhalt: " + message);
  }

  abstract handleIncomingPdu(receivedPdu: ChatPdu);

  abstract send(pdu: ChatPdu);

  abstract chatMessageEventAction(receivedPdu: ChatPdu);

  abstract logoutResponseAction(receivedPdu: ChatPdu);

  abstract loginEventAction(receivedPdu: ChatPdu);

  abstract logoutEventAction(receivedPdu: ChatPdu);

  abstract chatMessageResponseAction(receivedPdu: ChatPdu);

  abstract loginResponseAction(receivedPdu: ChatPdu);

  abstract loginRequest(userName: string);

  abstract handleUserListEvent(receivedPdu: ChatPdu);

  protected status: ClientConversationStatus = ClientConversationStatus.REGISTERING;

}
