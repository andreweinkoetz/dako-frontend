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

  // Anzeige aus Env-Konfig, ob Advanced-Variante verwendet wird.
   isAdvancedChat = isAdvancedChat;
   // Login-Fehler
   isError: boolean = false;
   errorCode: number = 0;
   // Benutzername
   username: string;
   //Client-Service
  private client: AbstractChatClientService;

  // Event-Emitter der je nach Impl.Variante einen Client-Service liefert.
  @Output() clientEvent = new EventEmitter<AbstractChatClientService>();

  // Konstruktor mit DI für beide Impl.-Varianten
  constructor(private clientSimple: SimpleChatClientService, private clientAdvanced: AdvancedChatClientService) { }

  // Anmeldung eines Benutzer durchführen.
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

  // Führt Login bei Drücken der Enter-Taste durch.
  onEnter() {
    this.login();
  }

  // Prüft ob Client erfolgreich angemeldet werden konnte und 
  // liefert ggf. Client-Service (mit passender Impl.Variante) zurück.
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
