import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { AbstractChatClientService } from '../abstract-chat-client.service';
import { ChatPdu } from '../chat-pdu';
import { Subscription } from 'rxjs';

// Komponente zur Repräsentation des Chatfensters
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit, AfterViewInit {

  // Initialisierung der Liste der angemeldeten Clients
  ngAfterViewInit(): void {
    this.updateUserList(this.client.userListEvent.getValue());
  }

  // Nachricht, die dem Chatfenster hinzugefügt werden soll
   messageToAdd: string = "";
   // Benutzer, der dem Chatfenster hinzugefügt werden soll
   usersToAdd: string = "";
   // Nachricht, die gesendet werden soll
   message: string;

   //Observables zum Empfangen von User- oder Nachrichten-Events
  private messageObservable: Subscription;
  private userListObservable: Subscription;

  // Client-Service
  @Input() private client: AbstractChatClientService;

  // Event-Emitter zur Benachrichtigung der Parent-Component bei Abmeldung
  @Output() private closedEvent = new EventEmitter<boolean>();

  constructor() { }

  // Prüft, ob ein angemeldeter User vorliegt und wird ggf. ausgeblendet.
  ngOnInit() {

    if (this.client == undefined) {
      sessionStorage.clear();
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

// Ermittelt Benutzer aus Session-Storage
  private getUserName(): string {
    return sessionStorage.getItem('username');
  }

  // Wenn Komponente beendet wird, werden Observables abgemeldet.
  ngOnDestroy() {
    this.messageObservable.unsubscribe();
    this.userListObservable.unsubscribe();
  }

  // Senden einer ChatPDU
  send() {
    this.client.tell(this.getUserName(), this.message);
    this.message = "";
  }

  // Fügt neue Nachricht in Chatfenster ein. Ergänzt Nachricht um Username und Icon.
  addMessage(pdu: ChatPdu) {
    this.messageToAdd = this.messageToAdd + '<i class="user circle outline icon"></i>' + pdu.getEventUserName() + ": " + pdu.getMessage() + "<br>";
  }

  // Erstellt Liste der angemeldeten Clients in View.
  updateUserList(pdu: ChatPdu) {
    this.usersToAdd = "";
    for (let user of pdu.getClients()) {
      this.usersToAdd += user + "<br>";
    }
  }

  // Meldet Client ab.
  logout() {
    this.client.logout(this.getUserName());
  }

}
