export const environment = {
  production: true
};

// Änderung der Implementierungstypen
export const isAdvancedChat : boolean = true;

// Hier kann die URI des Servers angepasst werden, falls benötigt
export const endpoint = {
  URL: isAdvancedChat ? 'ws://' + window.location.host +'/dako-backend/advancedchat' : 'ws://' + window.location.host +'/dako-backend/simplechat'
}
