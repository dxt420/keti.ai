import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CounsellingPage } from './counselling';

@NgModule({
  declarations: [
    CounsellingPage,
  ],
  imports: [
    IonicPageModule.forChild(CounsellingPage),
  ],
})
export class CounsellingPageModule {}
