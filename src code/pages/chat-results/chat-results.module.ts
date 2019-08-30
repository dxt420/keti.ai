import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatResultsPage } from './chat-results';

@NgModule({
  declarations: [
    ChatResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatResultsPage),
  ],
})
export class ChatResultsPageModule {}
