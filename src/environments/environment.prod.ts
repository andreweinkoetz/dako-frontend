export const environment = {
  production: true
};

export const isAdvancedChat : boolean = true;

export const endpoint = {
  URL: isAdvancedChat ? 'ws://' + window.location.host +'/dako-backend/advancedchat' : 'ws://' + window.location.host +'/dako-backend/simplechat'
}
