# DaKo-Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.8.

## Development server :pencil2:

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build :wrench:

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Änderung der Implementierungsvariante :computer:

Diese Einstellung kann nicht zur Laufzeit verändert, sondern muss in der Konfiguration der Umgebung angepasst werden. Die zugehörigen Konfigurationsdateien lauten `environment.prod.ts` für die Einstellungen in der Produktivumgebung und `environment.ts` für Testumgebungen. 
Als Konfiguration für den Einsatz als eigenständige Anwendung dient die Datei [environment.ts](https://github.com/hm-aweink/dako-frontend/blob/master/src/environments/environment.ts). Hier müssen neben der Implementierungsform auch die IP-Adresse bzw. der Hostname des WebSocket-Servers hinterlegt werden. Soll der WebSocket-Client hingegen ebenfalls von der Server-Anwendung ausgeliefert werden, so wird die Produktivkonfiguration [environment.prod.ts](https://github.com/hm-aweink/dako-frontend/blob/master/src/environments/environment.prod.ts) verwendet. Dazu muss die durch den Befehl `ng build –prod –base-href /NAME_DES_JAVA-PROJEKTS/` kompilierte Client-Anwendung in den webapp-Ordner des WebSocket-Serverprojekts verschoben werden.

```
// Änderung der Implementierungstypen
export const isAdvancedChat : boolean = true;
```



## Weitere Hilfe :question:

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
