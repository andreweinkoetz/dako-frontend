import { Injectable, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { ChatPdu } from './chat-pdu';
import { endpoint } from '../environments/environment';

// Service zum Empfang und zur Umwandlung von JSON in ChatPDUs
@Injectable()
export class ChatService {
  // Rx-Subject 
  public messages: Subject<ChatPdu>;
  // Geparste ChatPDU
  private pdu: ChatPdu;

    constructor(private wsService: WebsocketService) {
      this.messages = <Subject<ChatPdu>> wsService
        .connect(endpoint.URL)
        .map((response: MessageEvent): ChatPdu => {
          let data = JSON.parse(response.data);
          this.pdu = new ChatPdu();    
          this.pdu.setUserName(data.userName);
          this.pdu.setErrorCode(data.errorCode);
          this.pdu.setPduType(data.pduType);
          this.pdu.setClients(data.clients);
          this.pdu.setClientStatus(data.clientstatus);
          this.pdu.setEventUserName(data.eventUserName);
          this.pdu.setMessage(data.message);
          return this.pdu;   
        });
    }

    // Beendet Verbindung
    public close(){
      this.wsService.close();
    }

    // Führt Reconnect durch
    public reconnect(){
      this.wsService.reconnect(endpoint.URL);
    }

}
