import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { ChatPdu } from './chat-pdu';

const URL = 'ws://localhost:8080/dako-backend/simplechat';

@Injectable()
export class ChatClientService {
  public messages: Subject<ChatPdu>;
  private pdu: ChatPdu;


    constructor(wsService: WebsocketService) {
      this.messages = <Subject<ChatPdu>>wsService
        .connect(URL)
        .map((response: MessageEvent): ChatPdu => {
          let data = JSON.parse(response.data);
          this.pdu = new ChatPdu();    
          this.pdu.setUserName(data.userName);
          this.pdu.setPduType(data.pduType)
          return this.pdu;   
        });
    }

}
