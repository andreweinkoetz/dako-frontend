import { Component } from '@angular/core';
import { ChatClientService } from './chat-client.service';
import { ChatPdu } from './chat-pdu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DaKo-Frontend';

  constructor(private clientService: ChatClientService){
    clientService.messages.subscribe(pdu => {
      console.log("Response from websocket: " + pdu.getPdutype());
    
		});
  }

  sendMsg() {
		console.log('new message from client to websocket: ', 'new string message');
		this.clientService.messages.next();
  }
  
  simplefunc(){
    console.log("nothing to show here");
  }

}
