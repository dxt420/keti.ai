import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
// import { Facebook } from '@ionic-native/facebook';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  public pages: Array<{ title: string, component: any, icon: string }>;
  public loading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider) {



    this.pages = [
      // { title: 'Change Password', component: 'ResetPasswordPage', icon: "key" },
    ]
  }

  public openPage(a) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(a.component);

    this.navCtrl.push(a.component.toString());

  }

 public logout(){
   this.auth.logout();
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
