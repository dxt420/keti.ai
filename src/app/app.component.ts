import { FCM } from '@ionic-native/fcm';
import { AuthProvider } from './../providers/auth/auth';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import firebase from 'firebase';
import { AuthPage } from '../pages/auth/auth';


import { Storage } from '@ionic/storage';


import { Push } from '@ionic-native/push';
import { AppUpdate } from '@ionic-native/app-update';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { AuthProvider } from '../providers/auth/auth';

import { Network } from '@ionic-native/network';
import { NetworkProvider } from '../providers/network/network';


@Component({
  selector: 'page-menu',
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  // rootPage: any = AuthPage;
  loader: any;
  public pages: Array<{ title: string, component: any, icon: string }>;
  public pages1: Array<{ title: string, component: any, icon: string }>;
  @ViewChild(Nav) nav: Nav;

  public userProfile;
  initials;
  userToken;
  public isConnected:boolean = true;






  constructor(public auth: AuthProvider,
              public platform: Platform,
              public statusBar: StatusBar,
              splashScreen: SplashScreen,
              public storage: Storage,
              public push: Push,
              public events: Events,
              public fcm: FCM,
              public alertCtrl:AlertController,
              private appUpdate: AppUpdate,
              public http: HttpClient,
              public network: Network ,

              public networkProvider: NetworkProvider ) {



                // this.userProfile = this.auth.userProfile;
                // this.initials = this.userProfile.displayName.charAt(0) + "";

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.





      // this.storage.get('introShown').then((result) => {

      //   if (result) {


      //   } else {
      //     this.rootPage = StarterPage;
      //     this.storage.set('introShown', true);
      //   }



      // });

      this.networkProvider.initializeNetworkEvents();

                // Offline event
                this.events.subscribe('network:offline', () => {
                    alert('You have been disconnected from the internet');
                });

                // Online event
                this.events.subscribe('network:online', () => {
                    alert('You are connected');
                });



      this.appUpdate.checkAppUpdate('http://cdarh.org/keti.xml').then(() => {
        console.log('Update available');
        // this.fcm.subscribeToTopic('update');
      }).catch((error) => {

        console.log("Update Check failure: " + error);

      });




      firebase.auth().onAuthStateChanged( user => {
        if (user) {
          console.log(user);

          this.userProfile = user;
          this.initials = this.userProfile.displayName.charAt(0) + "";




        // if(firebase.database().ref().child("users").child(user.uid).child("profile")){

        //   this.rootPage = AboutPage;

        // }else{

        //   this.rootPage = TabsPage;

        // }

        this.rootPage = TabsPage;



          this.fcm.getToken().then(token => {
            // Your best bet is to here store the token on the user's profile on the
            // Firebase database, so that when you want to send notifications to this
            // specific user you can do it from Cloud Functions.

            var ref = firebase.database().ref().child("users");
              ref.child(user.uid).update({fcmtoken:token}).then(function (ref) {//use 'child' and 'set' combination to save data in your own generated key
                  console.log("Token Refreshed ");

                }, function (error) {
                  console.log(error);
                });


          });


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

                console.log(authToken)



                return this.http.post('https://keti-server.herokuapp.com/getUser',{}, requestOptions).toPromise()


              })
              .catch(error => {
                console.log('OOPS, error', error)
              })
        } else {
          this.rootPage = AuthPage;
          console.log("There's no user here");
        }
      });





      this.pages1 = [



      ]
      this.pages = [

        // { title: 'Send Feedback', component: 'FeedbackPage', icon: "chatboxes" },
        { title: 'Counselling', component: 'CounsellingPage', icon: "happy" },
        { title: 'Referral', component: 'ReferralPage', icon: "git-compare" },
        { title: 'Prescription', component: 'PrescriptionPage', icon: "medkit" },
        { title: 'Call Me', component: 'CallPage', icon: "call" },

        { title: 'Settings', component: 'SettingsPage', icon: "settings" },
        { title: 'About', component: 'AboutPage', icon: "information-circle" },



      ]



      statusBar.styleDefault();
      setTimeout(() => {
        splashScreen.hide();
      }, 300);







      fcm.onTokenRefresh().subscribe(token => {
        console.log('Token refreshed',token);
      });


    });



    fcm.onNotification().subscribe( data => {
      if (data.wasTapped) {
        //Notification was received on device tray and tapped by the user.
        console.log(JSON.stringify(data));


        let alert = this.alertCtrl.create({
          title: data.title,
          message: data.body,
          buttons: [
            {
              text: 'Done',
              role: 'cancel'
            }
          ]
        });

        alert.present();



        // this.nav.setRoot('NotificationsPage', { profileId: data.profileId });
      } else {
        //Notification was received in foreground. Maybe the user needs to be notified.
        console.log(JSON.stringify(data));

        let alert = this.alertCtrl.create({
          title: data.title,
          message: data.body,
          buttons: [
            {
              text: 'Done',
              role: 'cancel'
            }
          ]
        });

        alert.present();


        // this.nav.push('NotificationsPage', { profileId: data.profileId });
      }
    });










  }





  public openPage(a) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(a.component);

    this.nav.push(a.component.toString());

  }

  signOut() {
    this.auth.logout();
  }
}
