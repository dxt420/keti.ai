import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';
// import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';
import { NetworkProvider } from '../../providers/network/network';

// import { LoadingController } from 'ionic-angular';





@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {


  offline: boolean = false;
  public loading: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth: AuthProvider,
              public network: NetworkProvider,
              public alertCtrl:AlertController,
              public loadingCtrl: LoadingController,
               ) {


                // this.loading.dismissAll();
                if(network.isConnected()){
                  this.offline = true;
                }

                console.log(this.offline);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter AuthPage');
    // this.network.checkNetwork();

  }


  google(){
    this.auth.googleLogin();

  }

  reload(){
    // this.loading = this.loadingCtrl.create({ content: "Connecting" });
    // this.loading.present();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);

    


  }

  facebook(){
    this.auth.facebookLogin();
  }

}
