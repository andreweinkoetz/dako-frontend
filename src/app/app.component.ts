import { Component, Inject, OnInit } from '@angular/core';
import { AppModule } from './app.module';
import { AbstractChatClientService } from './abstract-chat-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'DaKo-Frontend';
  private client: AbstractChatClientService;
  loggedIn: boolean = sessionStorage.getItem('username') != null;
  constructor() { }

  receiveClientService($event) {
    this.client = $event;
    this.loggedIn = true;
  }

  receiveClosedEvent($event){
    this.client.reconnect();
  }

  

}
