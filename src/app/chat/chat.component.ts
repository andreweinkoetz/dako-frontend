import { Component, OnInit, Input } from '@angular/core';
import { AbstractChatClientService } from '../abstract-chat-client.service';
import { ChatPdu } from '../chat-pdu';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  private htmlToAdd: string = "";
  private message: string;
  private obs : Subscription;

  @Input() private client: AbstractChatClientService;

  constructor() {

   }

  ngOnInit() {
   this.obs = this.client.messageEvent$.subscribe(pdu => {
      this.addMessage(pdu);
    })
  }

  ngOnDestroy() {
    this.obs.unsubscribe();
  }

  send() {
    this.client.tell("Andre", this.message);
  }

  addMessage(pdu : ChatPdu) {
    this.htmlToAdd = this.htmlToAdd + pdu.getEventUserName() + ": " + pdu.getMessage() + "<br>";
  }

}
