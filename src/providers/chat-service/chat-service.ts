import { PusherServiceProvider } from './../pusher-service/pusher-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ChatServiceProvider {

  // private _url = 'http://localhost:5000';
  // private _url = 'https://keti-server.herokuapp.com/';
  // private _url = 'https://keti-server-v2.herokuapp.com';

// this is the new one

// dont forget to change port in servre
  private _url = 'https://keti-server.herokuapp.com';
  // private _url2 = 'https://keti-server-v2.herokuapp.com';




  private _channel : any;

  constructor(public http: HttpClient, private _pusher : PusherServiceProvider) {
    this._channel = this._pusher.getPusher().subscribe('chat-bot');
  }


  sendMessageConsult( message : string) : Observable<any>{
    const param = {
      type: 'human',
      message,
    };

    return this.http.post(`${this._url}/messageConsult`, param)
  }

  sendMessageResults( message : string) : Observable<any>{
    const param = {
      type: 'human',
      message,
    };

    return this.http.post(`${this._url}/messageResults`, param)
  }

  sendMessageRefer( message : string) : Observable<any>{
    const param = {
      type: 'human',
      message,
    };

    return this.http.post(`${this._url}/messageRefer`, param)
  }
  getChannel(){
    return this._channel;
  }
}
