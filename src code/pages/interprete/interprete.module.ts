import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InterpretePage } from './interprete';

@NgModule({
  declarations: [
    InterpretePage,
  ],
  imports: [
    IonicPageModule.forChild(InterpretePage),
  ],
})
export class InterpretePageModule {}
