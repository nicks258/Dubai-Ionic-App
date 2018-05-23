import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginkioskPage } from './loginkiosk';

@NgModule({
  declarations: [
    LoginkioskPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginkioskPage),
  ],
})
export class LoginkioskPageModule {}
