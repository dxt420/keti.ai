import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { LoadingController, AlertController } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';



@Injectable()
export class AuthProvider {


  //  additional fiekds

  // birthday
  // sex
  // phone
  // country
















  // public userProfile:any = null;
  public user: firebase.User;
  public loading: any;

  ttoken: any;

  constructor(public http: HttpClient,
    private googlePlus: GooglePlus,
    private facebook: Facebook,
    public loadingCtrl: LoadingController,
    public alertCtrl:AlertController,
    public fcm: FCM) {
    console.log('Hello AuthProvider Provider');

    this.loading = this.loadingCtrl.create({ content: " " });
    this.loading.present();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.fcm.getToken().then(token => {

          console.log(token);
          this.ttoken = token;

       });
        console.log(user);

        this.user = user;

        console.log("Logged in as " + this.user.displayName);
      } else {
        console.log("There's no user here");

      }
      this.loading.dismissAll();
    });

  }


  googleLogin(): void {
    this.loading = this.loadingCtrl.create({ content: "Logging in! please wait..." });
    this.loading.present();
    this.googlePlus.login({
      'webClientId': '885878744432-atrqecvsc6aou4s9bj7i76is20ece0mv.apps.googleusercontent.com',
      'offline': true
    }).then(res => {
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then(success => {

          console.log("Firebase success: " + JSON.stringify(success));



          // this.user = success;
        })
        .catch(error => {
            console.log("Firebase failure: " + JSON.stringify(error))
        });
    }).catch(err => {
        console.error("Error: ", err)
        if(err==10){

          let alert = this.alertCtrl.create({
            title: "Google Login failed",
            message: "Sorry 😢 : Connection failed",
            buttons: [
              {
                text: 'Done',
                role: 'cancel'
              }
            ]
          });

          alert.present();
        }
    });

    this.loading.dismissAll();
  }


  facebookLogin() {
    this.loading = this.loadingCtrl.create({ content: "Logging in! please wait..." });
    this.loading.present();
    this.facebook.login(['email']).then((response) => {
      const facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);

      firebase.auth().signInWithCredential(facebookCredential)
        .then((success) => {


          console.log("Firebase success: " + JSON.stringify(success));

          if (success.additionalUserInfo.isNewUser) {
            var ref = firebase.database().ref().child("users");
            var data = {
              email: success.additionalUserInfo.profile['email'],
              firstName: success.additionalUserInfo.profile['first_name'],
              lastName: success.additionalUserInfo.profile['last_name'],

              imageurl: success.additionalUserInfo.profile['picture'].data.url,
              // gender: success.gender,

              // notifyId: this.notifyId,
              // fcmtoken: this.ttoken,
              id: success.user.uid

            }
            ref.child(success.user.uid).set(data).then(function (ref) {//use 'child' and 'set' combination to save data in your own generated key
              console.log("Saved");

            }, function (error) {
              console.log(error);
            });


          }



        })
        .catch((error) => {

          console.log("Firebase failure: " + error);
        });

    }).catch((error) => {

      console.log(error)
      if(error.errorCode=='4201'){
        this.loading.dismissAll();
      }
    });


    this.loading.dismissAll();
  }




  logout() {
    this.loading = this.loadingCtrl.create({ content: "Logging Out" });
    this.loading.present();

    this.facebook.logout()
      .then(res => {
        firebase.auth().signOut();
        this.user = null;

        console.log('Logged Out');
      })
      .catch(e => {
        console.log('Error logout from innner Facebook', e);


      });


    this.googlePlus.logout()
      .then(res => {
        firebase.auth().signOut();
        this.user = null;

      })
      .catch(e => { console.log('Error logout from Google', e);  });
      this.loading.dismissAll();

  }

  registerDevice(a) {
    // this.notifyId = a;
  }


  getInitials() {

    return this.user.displayName.charAt(0) + "";

  }





}
