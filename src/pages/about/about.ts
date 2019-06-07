import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  abouttext: Promise<any>;
  loading;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    db: DataProvider,
    public loadingCtrl: LoadingController) {




    db.abouttext().then(data=>{
      console.log('value', data);
      this.abouttext = data;
  });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
