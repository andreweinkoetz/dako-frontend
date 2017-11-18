import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AbstractChatClientService } from '../abstract-chat-client.service';
import { SimpleChatClientService } from '../simple-chat-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  // @Input() private simpleClient : SimpleChatClientService;

  private username: string;
  private useAdvChat: boolean = false
  private client: AbstractChatClientService;
  @Output() clientEvent = new EventEmitter<AbstractChatClientService>();

  constructor(private clientSimple: SimpleChatClientService, private clientAdvanced: SimpleChatClientService) { }

  login() {
    if (this.useAdvChat) {
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
 
    }
  }

  ngOnInit() {
    
  }

}
