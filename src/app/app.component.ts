import { Component } from '@angular/core';
import { ChatClientService } from './chat-client.service';
import { ChatPdu } from './chat-pdu';
import { ClientConversationStatus } from './client-conversation-status.enum';
import { Pdutype } from './pdutype.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DaKo-Frontend';

  private status: ClientConversationStatus;

  constructor(private clientService: ChatClientService) {
    clientService.messages.subscribe(pdu => {
      console.log("Response from websocket: " + pdu.getPdutype());
      console.table(pdu.getClients());
      this.handleIncomingPdu(pdu);
    });
  }

  private handleIncomingPdu(pdu: ChatPdu) {
    console.log("Handling PDU Status: " + this.status);
    var type: Pdutype = pdu.getPdutype();
    switch (this.status) {
      case ClientConversationStatus.REGISTERING:
        console.log("switching PDUType: " + pdu.getPdutype());
        switch (type) {
          case Pdutype.LOGIN_RESPONSE:
            console.log("Erfolgreich eingeloggt");
            this.status = ClientConversationStatus.REGISTERED;
            break;
        }
        break;
      case ClientConversationStatus.REGISTERED:
        break;
      case ClientConversationStatus.UNREGISTERED:
        break;
      case ClientConversationStatus.UNREGISTERING:
        break;
    }
  }

  sendMsg() {
    console.log('new message from client to websocket: ', 'Test-Andre');

    var pdu: ChatPdu = new ChatPdu();

    switch (this.status) {
      case ClientConversationStatus.REGISTERING:
        break;
      case ClientConversationStatus.REGISTERED:
        break;
      case ClientConversationStatus.UNREGISTERED:
        break;
      case ClientConversationStatus.UNREGISTERING:
        break;
    }


    pdu.setUserName("Test-Andre");
    pdu.addClient("user1");
    pdu.addClient("andre");
    pdu.setClientStatus(ClientConversationStatus.REGISTERED);
    this.clientService.messages.next(pdu);
  }

  simplefunc() {
    console.log("Sending Request...");
    var pdu = ChatPdu.createLoginRequestPdu("Andre");
    if(this.status != ClientConversationStatus.REGISTERED){
    this.status = ClientConversationStatus.REGISTERING;
    }
    this.send(pdu);
  }

  private send(pdu: ChatPdu) {
    this.clientService.messages.next(pdu);
  }

}
