import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';

// Service-Klasse für den Aufbau einer WebSocket-Verbindung
@Injectable()
export class WebsocketService {
  constructor() { }

  // Rx-Subject zum Senden und Empfangen von Nachrichten
  private subject: Rx.Subject<MessageEvent>;

  // Startet Verbindung
  public connect(url): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    }
    return this.subject;
  }

  // Schließt Verbindung
  public close(){
    this.subject.complete();
    this.subject = undefined;
  }

  // Schließt Verbindung und baut sie anschließend wieder auf
  public reconnect(url){
    this.subject.complete();
    this.subject = null;
    this.connect(url);
  }

  // Erstellt Rx-Subject auf Basis von WebSocket
  // Benötigt Observer und Observable für Senden und Empfangen
  private create(url): Rx.Subject<MessageEvent> {
    let webSocket = new WebSocket(url);

    let observable = Rx.Observable.create(
      (obs: Rx.Observer<MessageEvent>) => {
        webSocket.onmessage = obs.next.bind(obs);
        webSocket.onerror = obs.error.bind(obs);
        webSocket.onclose = obs.complete.bind(obs);
        return webSocket.close.bind(webSocket);
      })
    let observer = {
      next: (data: Object) => {
        if (webSocket.readyState === WebSocket.OPEN) {
          webSocket.send(JSON.stringify(data));
        }
      }
    }
    return Rx.Subject.create(observer, observable);
  }

}