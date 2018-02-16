import { Component, Inject, OnInit } from '@angular/core';
import { AppModule } from './app.module';
import { AbstractChatClientService } from './abstract-chat-client.service';

// Start-Komponente
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'DaKo-Frontend';
  // ChatClient-Service in jeweiliger Impl. Variante
  private client: AbstractChatClientService;
  // Prüfung auf eingeloggten Benutzer
  loggedIn: boolean = sessionStorage.getItem('username') != null;
  constructor() { }

  // Übergabe der verwendeten Impl. Variante des Chats von Login-Component
  receiveClientService($event) {
    this.client = $event;
    this.loggedIn = true;
  }

  // Übergabe des ClosedEvents von Chat-Component
  receiveClosedEvent($event){
    this.client.reconnect();
  }

  

}
