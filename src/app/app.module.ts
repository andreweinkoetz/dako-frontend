import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WebsocketService } from './websocket.service';
import { ChatService } from './chat-client.service';
import { ChatPdu } from './chat-pdu';
import { Pdutype } from './pdutype.enum';
import { SimpleChatClientService } from './simple-chat-client.service';
import { AbstractChatClientService } from './abstract-chat-client.service';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { AdvancedChatClientService } from './advanced-chat-client.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [WebsocketService, ChatService, SimpleChatClientService, AdvancedChatClientService],
  bootstrap: [AppComponent]
})

// Modul zur Integration der Service-Klassen
export class AppModule {
  
}
