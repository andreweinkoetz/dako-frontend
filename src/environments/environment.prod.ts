export const environment = {
  production: true
};

export const isAdvancedChat : boolean = true;

export const serverAdress : string = "dako-backend.herokuapp.com";

export const endpoint = {
  URL: isAdvancedChat ? 'wss://' + serverAdress + '/advancedchat' : 'ws://' + serverAdress + ':8080/dako-backend/simplechat'
}
