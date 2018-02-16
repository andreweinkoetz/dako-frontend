import { Injectable } from '@angular/core';
import { AbstractChatClientService } from './abstract-chat-client.service';
import { ChatPdu } from './chat-pdu';
import { ClientConversationStatus } from './client-conversation-status.enum';
import { Pdutype } from './pdutype.enum';

// Service zur Repräsentation der Funktionalität der Advanced Varianten
@Injectable()
export class AdvancedChatClientService extends AbstractChatClientService {


  handleIncomingPdu(receivedPdu: ChatPdu) {
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
              console.debug("Ankommende PDU im Zustand " + this.status
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
              console.debug("Ankommende PDU im Zustand " + this.status
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
              console.debug("Ankommende PDU im Zustand " + this.status
                + " wird verworfen");
              break;
          }
          break;

        case ClientConversationStatus.UNREGISTERED:
          console.debug(
            "Ankommende PDU im Zustand " + this.status + " wird verworfen");
          break;

        default:
          console.debug("Unzulaessiger Zustand " + this.status);
      }
    }
  }
  chatMessageEventAction(receivedPdu: ChatPdu) {
    console.debug(
      "Chat-Message-Event-PDU von " + receivedPdu.getEventUserName() + " empfangen");

    // Eventzaehler erhoehen
    // sharedClientData.eventCounter.getAndIncrement();
    // int events = SharedClientData.messageEvents.incrementAndGet();

    // log.debug("MessageEventCounter: " + events);

    // ADVANCED_CHAT:Chat-Message-Event bestaetigen
    this.confirmChatMessageEvent(receivedPdu);

    // ADVANCED_CHAT:ConfirmCounter erhoehen
    // sharedClientData.confirmCounter.getAndIncrement();

    // Empfangene Chat-Nachricht an User Interface zur
    // Darstellung uebergeben
    this.messageEvent.next(receivedPdu);
  }

  loginEventAction(receivedPdu: ChatPdu) {
    // Eventzaehler fuer Testzwecke erhoehen
    // sharedClientData.eventCounter.getAndIncrement();
    // int events = SharedClientData.loginEvents.incrementAndGet();

    // console.debug(
    //   this.userName + " erhaelt LoginEvent, LoginEventCounter: " + events);

    this.handleUserListEvent(receivedPdu);


    // ADVANCED_CHAT: Bestaetigung senden
    this.confirmLoginEvent(receivedPdu);

    // ADVANCED_CHAT:ConfirmCounter erhoehen
    // sharedClientData.confirmCounter.getAndIncrement();
  }

  logoutEventAction(receivedPdu: ChatPdu) {
    console.debug(this.userName + " empfaengt Logout-Event-PDU fuer Client "
      + receivedPdu.getUserName());
    console.debug(this.userName + ": Clientliste: " + receivedPdu.getClients());

    // Eventzaehler fuer Testzwecke erhoehen
    // sharedClientData.eventCounter.getAndIncrement();
    // int events = SharedClientData.logoutEvents.incrementAndGet();

    // log.debug("LogoutEventCounter: " + events);

    this.handleUserListEvent(receivedPdu);


    // ADVANCED_CHAT: Bestaetigung senden
    this.confirmLogoutEvent(receivedPdu);

    // ADVANCED_CHAT: Confirmation-Zaehler erhoehen
    // sharedClientData.confirmCounter.getAndIncrement();
  }
  chatMessageResponseAction(receivedPdu: ChatPdu) {
    // console.debug("Sequenznummer der Chat-Response-PDU " + receivedPdu.getUserName() + ": "
    // + receivedPdu.getSequenceNumber() + ", Messagecounter: "
    // + sharedClientData.messageCounter.get());

    // if (receivedPdu.getSequenceNumber() == sharedClientData.messageCounter.get()) {

    //   // Zuletzt gemessene Serverzeit fuer das Benchmarking
    //   // merken
    //   userInterface.setLastServerTime(receivedPdu.getServerTime());

    //   // Naechste Chat-Nachricht darf eingegeben werden
    //   userInterface.setLock(false);

    //   log.debug("Chat-Response-PDU fuer Client " + receivedPdu.getUserName()
    //     + " empfangen, Serverbearbeitungszeit: "
    //     + +receivedPdu.getServerTime() / 1000000 + " ms");

    // } else {
    //   log.debug("Sequenznummer der Chat-Response-PDU " + receivedPdu.getUserName()
    //     + " passt nicht: " + receivedPdu.getSequenceNumber() + "/"
    //     + sharedClientData.messageCounter.get());
    // }

    console.log("Chat-Message-Response PDU received für Client " + receivedPdu.getUserName());
  }

  // Bestätigt ein eintreffende Message-Event
  private confirmChatMessageEvent(receivedPdu: ChatPdu) {

    var responsePdu: ChatPdu = ChatPdu.createChatMessageEventConfirm(this.userName,
      receivedPdu);

    this.send(responsePdu);
    console.debug("Chat-Message-Event-Confirm-PDU fuer " + receivedPdu.getUserName()
      + " bzgl. eines urspruenglichen Events von " + receivedPdu.getEventUserName()
      + " an den Server gesendet");

  }

   // Bestätigt ein eintreffende Logout-Event
  private confirmLogoutEvent(receivedPdu: ChatPdu) {

    var responsePdu: ChatPdu = ChatPdu.createLogoutEventConfirm(this.userName,
      receivedPdu);
    this.send(responsePdu);
    console.debug("Logout-Event-Confirm-PDU fuer " + receivedPdu.getUserName()
      + " bzgl. eines urspruenglichen Events von " + receivedPdu.getEventUserName()
      + " an den Server gesendet");
  }

   // Bestätigt ein eintreffende Login-Event
  private confirmLoginEvent(receivedPdu: ChatPdu) {

    var responsePdu: ChatPdu = ChatPdu.createLoginEventConfirm(this.userName,
      receivedPdu);

    this.send(responsePdu);
    console.log("Login-Event-Confirm-PDU fuer " + receivedPdu.getUserName()
      + " bzgl. eines urspruenglichen Events von " + receivedPdu.getEventUserName()
      + " an den Server gesendet");

  }

  // Verarbeitet eine eintreffende Login-Response
  loginResponseAction(receivedPdu: ChatPdu) {
    if (receivedPdu.getErrorCode() == 1) {
      // Login hat nicht funktioniert
      console.debug("Login-Response-PDU fuer Client " + receivedPdu.getUserName()
        + " mit Login-Error empfangen");
      // userInterface.setErrorMessage(
      // 		"Chat-Server", "Anmelden beim Server nicht erfolgreich, Benutzer "
      // 				+ receivedPdu.getUserName() + " vermutlich schon angemeldet",
      // 		receivedPdu.getErrorCode());
      this.status = ClientConversationStatus.UNREGISTERED;
      this.loginErrorEvent.next(1);
      this.clientService.reconnect();
      // Verbindung wird gleich geschlossen

    } else {
      // Login hat funktioniert
      this.status = ClientConversationStatus.REGISTERED;
      sessionStorage.setItem('username', receivedPdu.getUserName());
      this.loginErrorEvent.next(0);
      console.debug(
        "Login-Response-PDU fuer Client " + receivedPdu.getUserName() + " empfangen");
    }
  }


}
