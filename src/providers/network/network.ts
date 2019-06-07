import { AlertController, Events } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Injectable } from '@angular/core';





export enum ConnectionStatusEnum {
  Online,
  Offline
}



@Injectable()
export class NetworkProvider {

  previousStatus;
  isConnected(): boolean {
    let conntype = this.network.type;
    return conntype && conntype !== 'unknown' && conntype !== 'none';
  }

  constructor(
              public network: Network,
              public eventCtrl: Events,

              public alertCtrl:AlertController) {

                this.previousStatus = ConnectionStatusEnum.Online;

                // if(!this.isConnected()){
                //   let alert = this.alertCtrl.create({
                //     title: 'No network',
                //     message: 'Check your internet connection',
                //     buttons: [{
                //       text: "OK",
                //       handler: () => { this.platform.exitApp(); }
                //     }]
                //   })
                //   alert.present();
                // }
  }

  // checkNetwork(){
  //   this.network.onConnect().subscribe(data => {
  //     console.log(data)
  //   }, error => console.error(error));

  //   this.network.onDisconnect().subscribe(data => {
  //     console.log(data)
  //   }, error => console.error(error));
  // }

  // displayNetworkUpdate(connectionState: string){
  //   let networkType = this.network.type;
  //   this.toast.create({
  //     message: `You are now ${connectionState} via ${networkType}`,
  //     duration: 3000
  //   }).present();
  // }

  public initializeNetworkEvents(): void {
    this.network.onDisconnect().subscribe(() => {
        if (this.previousStatus === ConnectionStatusEnum.Online) {
            this.eventCtrl.publish('network:offline');
        }
        this.previousStatus = ConnectionStatusEnum.Offline;
    });
    this.network.onConnect().subscribe(() => {
        if (this.previousStatus === ConnectionStatusEnum.Offline) {
            this.eventCtrl.publish('network:online');
        }
        this.previousStatus = ConnectionStatusEnum.Online;
    });
}

}
