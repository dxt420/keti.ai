import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
// import { AuthProvider } from '../../providers/auth/auth';
// import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public pages: Array<{ title: string, component: any, icon: string }>;

  public userProfile;
  lastName;
  initials;
  public loading: any;

  constructor(public navCtrl: NavController,
    public auth: AuthProvider,
    public loadingCtrl: LoadingController) {


      this.loading = this.loadingCtrl.create({ content: " " });
      this.loading.present();
      this.initials = auth.getInitials();
      this.userProfile = auth.user;
      console.log(this.userProfile);
      // this.lastName = this.userProfile.additionalUserInfo.profile['last_name'];
      this.loading.dismissAll();

      this.pages = [
        { title: 'Consult', component: 'ChatConsultPage', icon: "chatboxes" },
      ]




  }

  openPage(a) {

    this.navCtrl.push(a.component.toString());

  }
}
