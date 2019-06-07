import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  public userProfile;
  aa;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public alertCtrl:AlertController,
     public auth: AuthProvider,
     db: DataProvider) {
    let alert = this.alertCtrl.create({
      title: "💫",
      message: "Sorry but this feature is still under upgrade 😢",
      buttons: [
        {
          text: 'Done',
          role: 'cancel'
        }
      ]
    });

    alert.present();
    db.prescriptionText().then(data=>{
      console.log('value', data);
      this.aa = data;
    });


    this.userProfile = auth.user;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

}
