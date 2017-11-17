import { Component, Inject } from '@angular/core';
import { AppModule } from './app.module';
import { SimpleChatClientService } from './simple-chat-client.service';
import { AbstractChatClientService } from './abstract-chat-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DaKo-Frontend';
  private client: AbstractChatClientService;
  private loggedIn: boolean = false;
  constructor() { }

  receiveClientService($event) {
    this.client = $event;
    this.loggedIn = true;
  }

}
