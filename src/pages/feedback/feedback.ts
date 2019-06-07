import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailComposer } from '@ionic-native/email-composer';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  form: FormGroup;
  public loading: any;
  userProfile;


  constructor(public auth: AuthProvider,
    public loadingCtrl: LoadingController,
    private emailComposer: EmailComposer,
    public navCtrl: NavController,
    public navParams: NavParams,fb: FormBuilder) {

    this.form = fb.group({
      feedbacktext: ['', Validators.compose([Validators.required])]
    });

    // this.loading = this.loadingCtrl.create({ content: " " });
    //   this.loading.present();


      this.userProfile = auth.user;
      console.log(this.userProfile);

      // this.loading.dismissAll();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

  send(){
    this.loading = this.loadingCtrl.create({ content: " " });
    this.loading.present();

    let message = this.form.value.feedbacktext + '✔✔✔✔✔ Message sent from :::NAME=>' + this.userProfile.displayName + '✔✔✔✔✔ :::EMAIL=>' + this.userProfile.email;

    let email = {
      to: 'keti.ai2019@gmail.com',
      cc: 'omonaderrick25@gmail.com',
      bcc: ['thehooch97@protonmail.com', 'omonaderrick26@gmail.com'],
      subject: 'In App Feedback',
      body: message
    };
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send
        this.emailComposer.open(email);
      }
     });
     this.loading.dismissAll();
  }

}
