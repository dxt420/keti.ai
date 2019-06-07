import { InterpretePage } from './../pages/interprete/interprete';

import { NgModule, ErrorHandler, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// import { AboutPage } from '../pages/about/about';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from "@angular/common/http";
import { CacheModule } from 'ionic-cache-observable';
import { AuthPage } from '../pages/auth/auth';
import { IonicStorageModule } from '@ionic/storage';


import { SpeechRecognition } from '@ionic-native/speech-recognition';


import { NotificationsPage } from '../pages/notifications/notifications';
import { TextToSpeech } from '@ionic-native/text-to-speech';

import { ImagePicker } from '@ionic-native/image-picker';

import {AppUpdate} from "@ionic-native/app-update";

import { Push } from '@ionic-native/push';
import { GooglePlus } from '@ionic-native/google-plus';
import { AuthProvider } from '../providers/auth/auth';


import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';

import { FCM } from '@ionic-native/fcm';
import { ChatServiceProvider } from '../providers/chat-service/chat-service';
import { PusherServiceProvider } from '../providers/pusher-service/pusher-service';
import { DataProvider } from '../providers/data/data';
import { EmailComposer } from '@ionic-native/email-composer';

import { Network } from '@ionic-native/network';
import { NetworkProvider } from '../providers/network/network';
import { ChatResultsPage } from '../pages/chat-results/chat-results';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// import { IonTextAvatar } from 'ionic-text-avatar';

firebase.initializeApp({
  apiKey: "AIzaSyBbcT4BZ8tiDWsrbV16eFgo_z17bqBsOBs",
  authDomain: "chanjia-e9ddb.firebaseapp.com",
  databaseURL: "https://chanjia-e9ddb.firebaseio.com",
  projectId: "chanjia-e9ddb",
  storageBucket: "chanjia-e9ddb.appspot.com",
  messagingSenderId: "885878744432"
});



@NgModule({
  declarations: [
    MyApp,


    HomePage,
    TabsPage,
    AuthPage,

    InterpretePage,

    NotificationsPage


  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: true
    }),
    CacheModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule


    // HttpModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,


    HomePage,
    TabsPage,
    AuthPage,

    InterpretePage,

    NotificationsPage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Facebook,
    FCM,
    AppUpdate,
    ChatServiceProvider,
    PusherServiceProvider,
    ImagePicker,
    SpeechRecognition,
    // InAppBrowser,
    TextToSpeech,
    DataProvider,
    EmailComposer,
    Network,
    NetworkProvider

  ]
})
export class AppModule {}

enableProdMode();
