import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { AbstractChatClientService } from '../abstract-chat-client.service';
import { ChatPdu } from '../chat-pdu';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
    this.updateUserList(this.client.userListEvent.getValue());
  }

   messageToAdd: string = "";
   usersToAdd: string = "";
   message: string;
  private messageObservable: Subscription;
  private userListObservable: Subscription;

  @Input() private client: AbstractChatClientService;
  @Output() private closedEvent = new EventEmitter<boolean>();

  constructor() { }


  ngOnInit() {

    if (this.client == undefined) {
      localStorage.clear();
      this.closedEvent.emit(true);
      window.location.reload();
    } else {

      this.messageObservable = this.client.messageEvent$.subscribe(pdu => {
        this.addMessage(pdu);
      })

      this.userListObservable = this.client.userListEvent$.subscribe(pdu => {
        this.updateUserList(pdu);
      })
    }

  }


  private getUserName(): string {
    return localStorage.getItem('username');
  }

  ngOnDestroy() {
    this.messageObservable.unsubscribe();
    this.userListObservable.unsubscribe();
  }

  send() {
    this.client.tell(this.getUserName(), this.message);
    this.message = "";
  }

  addMessage(pdu: ChatPdu) {
    this.messageToAdd = this.messageToAdd + '<i class="address book outline icon"></i>' + pdu.getEventUserName() + ": " + pdu.getMessage() + "<br>";
  }

  updateUserList(pdu: ChatPdu) {
    this.usersToAdd = "";
    for (let user of pdu.getClients()) {
      this.usersToAdd += user + "<br>";
    }
  }

  logout() {
    this.client.logout(this.getUserName());
  }

}
