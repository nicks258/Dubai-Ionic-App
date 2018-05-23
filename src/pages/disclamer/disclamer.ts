import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginkioskPage} from "../loginkiosk/loginkiosk";

/**
 * Generated class for the DisclamerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-disclamer',
  templateUrl: 'disclamer.html',
})
export class DisclamerPage {
  email;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.email = navParams.get("email");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisclamerPage');
  }
  nextPage(){

    this.navCtrl.push(LoginkioskPage, {email: this.email}, {
      animate: true,
      animation: 'transition',
      duration: 300,
      direction: 'forward'
    });
  }
}
