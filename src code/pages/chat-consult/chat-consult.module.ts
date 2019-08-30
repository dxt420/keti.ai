import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatConsultPage } from './chat-consult';

@NgModule({
  declarations: [
    ChatConsultPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatConsultPage),
  ],
})
export class ChatConsultPageModule {}
