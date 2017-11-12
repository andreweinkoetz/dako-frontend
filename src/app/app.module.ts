import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WebsocketService } from './websocket.service';
import { ChatClientService } from './chat-client.service';
import { ChatPdu } from './chat-pdu';
import { Pdutype } from './pdutype.enum';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [WebsocketService, ChatClientService],
  bootstrap: [AppComponent]
})
export class AppModule { 


}
