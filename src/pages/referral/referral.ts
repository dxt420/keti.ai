import { ChatServiceProvider } from './../../providers/chat-service/chat-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';
import { IChat } from '../../models/chatModel';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';



@IonicPage()
@Component({
  selector: 'page-referral',
  templateUrl: 'referral.html',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':leave', [
          stagger(100, [
            animate('0.5s', style({ opacity: 0 }))
          ])
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ],
})
export class ReferralPage {




  chats : IChat[] = [];
  message : string;
  sending : boolean;
  tt: boolean;


  text: string;
  rate: number;
  locale: string;

  public userProfile;

  aa;
  constructor(public navCtrl: NavController,
    private tts: TextToSpeech,
              public speechRecognition: SpeechRecognition,
              private _chat : ChatServiceProvider,
     public navParams: NavParams,
     public alertCtrl:AlertController,
     public auth: AuthProvider,
     public db: DataProvider) {
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
    db.referralText().then(data=>{
      console.log('value', data);
      this.aa = data;
    });


    this.text = 'Initial text';
    this.rate = 3;
    this.locale = 'en-US';


    this.userProfile = auth.user;

    speechRecognition.hasPermission()
    .then((hasPermission: boolean) => {

      if (!hasPermission) {
      speechRecognition.requestPermission()
        .then(
          () => console.log('Granted'),
          () => console.log('Denied')
        )
      }

   });
  }


  ionViewDidEnter(){
    this.db.referDisclaimerText().then(data=>{
      console.log('value', data);
      this.aa = data;
      let alert = this.alertCtrl.create({
        title: "Notice",
        message: data,
        buttons: [
          {
            text: 'Okay',
            role: 'cancel'
          }
        ]
      });

      alert.present();
    });
  }


  ionViewDidLoad() {
    // subscribe to pusher's event
    console.log('ionViewDidLoad ReferralPage');
    this._chat.getChannel().bind('chat', data => {
      if(data.type !== 'bot'){
        data.isMe = true;

      };
      console.log(data);

      // if(data.kind == 'ONE'){

      // };
      this.chats.push(data);
      console.log(this.chats);
    });
}

playText(ttext) {
  console.log('Yap Mode');

  this.tts.speak({
    text: ttext,
    rate: this.rate / 10,
    locale: this.locale
  })
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));

}



startVoice() {

  this.speechRecognition.startListening()
    .subscribe(
      (matches: Array<string>) => {
      //  this.bgcolor = matches[0];
      this.sendVoiceMessage(matches[0]);
      },
      (onerror) => console.log('error:', onerror)
    )

}

sendMessage() {
  this.sending = true;
  this._chat.sendMessageRefer(this.message)
    .subscribe(resp => {
      this.message = '';
     this.sending = false;
     this.tt = true;
      setTimeout(() => {
        console.log('Test');
        this.tt = false;
    }, 2000);
    }, err => {
      console.log(err)
     this.sending = false;
    } );
}



sendVoiceMessage(message) {
  this.sending = true;
  this._chat.sendMessageRefer(message)
    .subscribe(resp => {

      this.message = '';
      this.sending = false;
      this.tt = true;
      setTimeout(() => {
        console.log('Test');
        this.tt = false;
    }, 2000);
    }, err => {
      this.sending = false;
    } );
}

}
