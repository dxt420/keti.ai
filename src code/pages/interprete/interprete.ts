import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the InterpretePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-interprete',
  templateUrl: 'interprete.html',
})
export class InterpretePage {
  public pages: Array<{ title: string, component: any, icon: string }>;

  aa;
  bb;
  time;
timedGreeting;
public userProfile;
initials;
public loading: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    db: DataProvider,
    public auth: AuthProvider,
    public loadingCtrl: LoadingController,) {

    this.time =   new Date().getHours();

      if(this.time < 12){
        this.timedGreeting = "Good morning"
      }else if(this.time < 17 ){
        this.timedGreeting = "Good afternoon"
      }else{
        this.timedGreeting = "Good evening"
      }

    
      this.initials = auth.getInitials();

      this.userProfile = auth.user;
      console.log(this.userProfile);

    db.interpreteText().then(data=>{
      console.log('value', data);
      this.aa = data;
    });

    db.interpreteButtonText().then(data=>{
      console.log('value', data);
      this.bb = data;
    });



    this.pages = [
      { title: 'Consult', component: 'ChatResultsPage', icon: "chatboxes" },
    ]
  }

  openPage(a) {

    this.navCtrl.push(a.component.toString());

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InterpretePage');
  }

}
