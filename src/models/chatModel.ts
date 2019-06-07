export interface IChat {
  id : string;
  message? : string;
  messages? : object;
  isMe : boolean;
  createdAt : string;
  type : 'human' | 'bot',
  extra? : object,
  kind : any,

}
