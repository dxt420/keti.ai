import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';
// import { LoadingController } from 'ionic-angular';





@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth: AuthProvider ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
  }


  google(){
    this.auth.googleLogin();

  }

  facebook(){
    this.auth.facebookLogin();
  }

}
