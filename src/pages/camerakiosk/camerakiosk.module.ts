import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CamerakioskPage } from './camerakiosk';

@NgModule({
  declarations: [
    CamerakioskPage,
  ],
  imports: [
    IonicPageModule.forChild(CamerakioskPage),
  ],
})
export class CamerakioskPageModule {}
