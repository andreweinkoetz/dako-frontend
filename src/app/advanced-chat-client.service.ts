import { Injectable } from '@angular/core';
import { AbstractChatClientService } from './abstract-chat-client.service';
import { ChatPdu } from './chat-pdu';

@Injectable()
export class AdvancedChatClientService extends AbstractChatClientService {
  handleIncomingPdu(receivedPdu: ChatPdu) {
    throw new Error("Method not implemented.");
  }
  send(pdu: ChatPdu) {
    throw new Error("Method not implemented.");
  }
  chatMessageEventAction(receivedPdu: ChatPdu) {
    throw new Error("Method not implemented.");
  }
  logoutResponseAction(receivedPdu: ChatPdu) {
    throw new Error("Method not implemented.");
  }
  loginEventAction(receivedPdu: ChatPdu) {
    throw new Error("Method not implemented.");
  }
  logoutEventAction(receivedPdu: ChatPdu) {
    throw new Error("Method not implemented.");
  }
  chatMessageResponseAction(receivedPdu: ChatPdu) {
    throw new Error("Method not implemented.");
  }
  loginResponseAction(receivedPdu: ChatPdu) {
    throw new Error("Method not implemented.");
  }
  loginRequest(userName: string) {
    throw new Error("Method not implemented.");
  }
  handleUserListEvent(receivedPdu: ChatPdu) {
    throw new Error("Method not implemented.");
  }

}
