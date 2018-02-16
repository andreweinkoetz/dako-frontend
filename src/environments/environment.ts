// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false
};

// Änderung der Implementierungstypen
export const isAdvancedChat : boolean = true;

// Hier kann die IP des Servers angepasst werden, falls benötigt
export const serverAdress : string = "localhost";

// Hier kann die URI des Servers angepasst werden, falls benötigt
export const endpoint = {
  URL: isAdvancedChat ? 'ws://' + serverAdress + ':8080/dako-backend/advancedchat' : 'ws://' + serverAdress + ':8080/dako-backend/simplechat'
};
