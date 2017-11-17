import { Injectable, } from '@angular/core';
import { ChatPdu } from './chat-pdu';
import { ClientConversationStatus } from './client-conversation-status.enum';
import { Pdutype } from './pdutype.enum';
import { AbstractChatClientService } from './abstract-chat-client.service';

@Injectable()
export class SimpleChatClientService extends AbstractChatClientService {

  handleUserListEvent(receivedPdu: ChatPdu) {
    console.log(receivedPdu.getClients());
  }

  handleIncomingPdu(receivedPdu: ChatPdu) {

    console.log("Handling PDU Status: " + this.status);

    if (receivedPdu != null) {

      switch (this.status) {

        case ClientConversationStatus.REGISTERING:

          switch (receivedPdu.getPdutype()) {

            case Pdutype.LOGIN_RESPONSE:
              // Login-Bestaetigung vom Server angekommen
              this.loginResponseAction(receivedPdu);

              break;

            case Pdutype.LOGIN_EVENT:
              // Meldung vom Server, dass sich die Liste der
              // angemeldeten User erweitert hat
              this.loginEventAction(receivedPdu);

              break;

            case Pdutype.LOGOUT_EVENT:
              // Meldung vom Server, dass sich die Liste der
              // angemeldeten User veraendert hat
              this.logoutEventAction(receivedPdu);

              break;

            case Pdutype.CHAT_MESSAGE_EVENT:
              // Chat-Nachricht vom Server gesendet
              this.chatMessageEventAction(receivedPdu);
              break;

            default:
              console.log("Ankommende PDU im Zustand " + this.status
                + " wird verworfen");
          }
          break;

        case ClientConversationStatus.REGISTERED:

          switch (receivedPdu.getPdutype()) {

            case Pdutype.CHAT_MESSAGE_RESPONSE:

              // Die eigene zuletzt gesendete Chat-Nachricht wird vom
              // Server bestaetigt.
              this.chatMessageResponseAction(receivedPdu);
              break;

            case Pdutype.CHAT_MESSAGE_EVENT:
              // Chat-Nachricht vom Server gesendet
              this.chatMessageEventAction(receivedPdu);
              break;

            case Pdutype.LOGIN_EVENT:
              // Meldung vom Server, dass sich die Liste der
              // angemeldeten User erweitert hat
              this.loginEventAction(receivedPdu);

              break;

            case Pdutype.LOGOUT_EVENT:
              // Meldung vom Server, dass sich die Liste der
              // angemeldeten User veraendert hat
              this.logoutEventAction(receivedPdu);

              break;

            default:
              console.log("Ankommende PDU im Zustand " + this.status
                + " wird verworfen");
          }
          break;

        case ClientConversationStatus.UNREGISTERING:

          switch (receivedPdu.getPdutype()) {

            case Pdutype.CHAT_MESSAGE_EVENT:
              // Chat-Nachricht vom Server gesendet
              this.chatMessageEventAction(receivedPdu);
              break;

            case Pdutype.LOGOUT_RESPONSE:
              // Bestaetigung des eigenen Logout
              this.logoutResponseAction(receivedPdu);
              break;

            case Pdutype.LOGIN_EVENT:
              // Meldung vom Server, dass sich die Liste der
              // angemeldeten User erweitert hat
              this.loginEventAction(receivedPdu);

              break;

            case Pdutype.LOGOUT_EVENT:
              // Meldung vom Server, dass sich die Liste der
              // angemeldeten User veraendert hat
              this.logoutEventAction(receivedPdu);

              break;

            default:
              console.log("Ankommende PDU im Zustand " + this.status
                + " wird verworfen");
              break;
          }
          break;

        case ClientConversationStatus.UNREGISTERED:
          console.log(
            "Ankommende PDU im Zustand " + this.status + " wird verworfen");

          break;

        default:
          console.log("Unzulaessiger Zustand " + this.status);
      }
    }
  }

  chatMessageEventAction(receivedPdu: ChatPdu) {
    console.log(receivedPdu.getUserName() + ": " + receivedPdu.getMessage());
    this.messageEvent.next(receivedPdu);
  }
  logoutResponseAction(receivedPdu: ChatPdu) {
    this.status = ClientConversationStatus.UNREGISTERED;

    // userInterface.setSessionStatisticsCounter(sharedClientData.eventCounter.longValue(),
    //     sharedClientData.confirmCounter.longValue(), 0, 0, 0);

  }
  loginEventAction(receivedPdu: ChatPdu) {
    this.handleUserListEvent(receivedPdu);
  }
  logoutEventAction(receivedPdu: ChatPdu) {
    this.handleUserListEvent(receivedPdu);
  }
  chatMessageResponseAction(receivedPdu: ChatPdu) {
    console.log(receivedPdu.getMessage() + " wurde übertragen");
  }
  loginResponseAction(receivedPdu: ChatPdu) {
    if (receivedPdu.getErrorCode() == 1) {

      // Login hat nicht funktioniert
      console.error("Login-Response-PDU fuer Client " + receivedPdu.getUserName()
        + " mit Login-Error empfangen");
      // userInterface.setErrorMessage(
      //     "Chat-Server", "Anmelden beim Server nicht erfolgreich, Benutzer "
      //         + receivedPdu.getUserName() + " vermutlich schon angemeldet",
      //     receivedPdu.getErrorCode());
      this.status = ClientConversationStatus.UNREGISTERED;

      // Verbindung wird gleich geschlossen
      // try {
      //   connection.close();
      // } catch (Exception e) {
      // }

    } else {
      // Login hat funktioniert
      this.status = ClientConversationStatus.REGISTERED;

      // userInterface.loginComplete();

      console.debug(
        "Login-Response-PDU fuer Client " + receivedPdu.getUserName() + " empfangen");
    }
  }

  send(pdu: ChatPdu) {
    this.clientService.messages.next(pdu);
  }

  loginRequest(userName: string) {
    console.log("Sending Request...");
    var pdu = ChatPdu.createLoginRequestPdu(userName);
    this.send(pdu);
  }
}
