import { PusherServiceProvider } from './../pusher-service/pusher-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase';

@Injectable()
export class ChatServiceProvider {

  // private _url = 'http://localhost:5000';
  // private _url = 'https://keti-server.herokuapp.com/';
  // private _url = 'https://keti-server-v2.herokuapp.com';

// this is the new one

// dont forget to change port in servre
  private _url = 'https://keti-server.herokuapp.com';
  // private _url2 = 'https://keti-server-v2.herokuapp.com';

  userToken


  private _channel : any;

  constructor(public http: HttpClient, private _pusher : PusherServiceProvider) {
    this._channel = this._pusher.getPusher().subscribe('chat-bot');

    firebase.auth().currentUser.getIdToken()
    .then(authToken => {



      var headerDict = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Authorization': 'Bearer ' + authToken
      };

      var requestOptions = {
        headers: new HttpHeaders(headerDict)
      };

      this.userToken = authToken
      console.log(authToken)



      return this.http.post('https://keti-server.herokuapp.com/getUser',{}, requestOptions).toPromise()


    })
    .catch(error => {
      console.log('OOPS, error', error)
    })
  }


  sendMessageConsult( message : string ) : Observable<any>{
    const param = {
      type: 'human',
      message,
      token: this.userToken
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
