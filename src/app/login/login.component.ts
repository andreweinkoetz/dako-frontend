import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AbstractChatClientService } from '../abstract-chat-client.service';
import { SimpleChatClientService } from '../simple-chat-client.service';
import { isAdvancedChat } from '../../environments/environment';
import { AdvancedChatClientService } from '../advanced-chat-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

   isAdvancedChat = isAdvancedChat;
   isError: boolean = false;
   errorCode: number = 0;
   username: string;
  private client: AbstractChatClientService;
  @Output() clientEvent = new EventEmitter<AbstractChatClientService>();

  constructor(private clientSimple: SimpleChatClientService, private clientAdvanced: AdvancedChatClientService) { }

  login() {
    if (isAdvancedChat) {
      this.client = this.clientAdvanced;
    } else {
      this.client = this.clientSimple;
    }
    this.client.loginErrorEvent$.subscribe(errorCode => {
      this.checkLogin(errorCode);
    })
    this.client.loginRequest(this.username);
  }

  onEnter() {
    this.login();
  }

  checkLogin(errorCode: number) {
    if (errorCode == 0) {
      this.clientEvent.emit(this.client);
    } else {
      this.isError = true;
      this.errorCode = errorCode;
      console.log("Fehler beim Login aufgetreten. Fehlernummer: " + errorCode);
    }
  }

  ngOnInit() {
    
  }

}
