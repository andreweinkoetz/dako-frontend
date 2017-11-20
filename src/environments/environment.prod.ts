export const environment = {
  production: true
};

export const isAdvancedChat : boolean = true;

export const serverAdress : string = "IP_ADRESS_BACKEND";

export const endpoint = {
  URL: isAdvancedChat ? 'ws://' + serverAdress + ':8080/dako-backend/advancedchat' : 'ws://' + serverAdress + ':8080/dako-backend/simplechat'
}
