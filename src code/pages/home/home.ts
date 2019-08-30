import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
// import { AuthProvider } from '../../providers/auth/auth';
// import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';
import { NetworkProvider } from '../../providers/network/network';

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
  aa: Promise<any>;
  bb;
  offline: boolean = false;

time;
timedGreeting;

  constructor(public navCtrl: NavController,
    public alertCtrl:AlertController,
    public auth: AuthProvider,
    public loadingCtrl: LoadingController,
    public network: NetworkProvider,

    db: DataProvider) {

      this.time =   new Date().getHours();

      if(this.time < 12){
        this.timedGreeting = "Good morning"
      }else if(this.time < 17 ){
        this.timedGreeting = "Good afternoon"
      }else{
        this.timedGreeting = "Good evening"
      }

      if(network.isConnected()){
        this.offline = true;
      }



      this.loading = this.loadingCtrl.create({ content: " " });
      this.loading.present();
      this.initials = auth.getInitials();

      this.userProfile = auth.user;
      console.log(this.userProfile);

      db.hometext().then(data=>{
        console.log('value', data);
        this.aa = data;
    });

    db.homeButtontext().then(data=>{
      console.log('value', data);
      this.bb = data;
  });

      this.loading.dismissAll();

      this.pages = [
        { title: 'Consult', component: 'ChatConsultPage', icon: "chatboxes" },
      ]

      this.alerter();






  }

  openPage(a) {

    this.navCtrl.push(a.component.toString());

  }

  reload(){

    this.navCtrl.setRoot(this.navCtrl.getActive().component);



  }


  alerter(){
    let alert = this.alertCtrl.create({
      title: "About Privacy",
      message: "By using this app, you agree to share all your personal related information. Please feel safe as you're information will not be shared with anyone else. Read our privacy policy in the Settings page to know how we treat your data" ,

      buttons: [
        {
          text: 'Okay, Got it',
          role: 'cancel'
        }
      ]
    });

    alert.present();
  }
}
