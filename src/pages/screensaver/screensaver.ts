import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";

/**
 * Generated class for the ScreensaverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-screensaver',
  templateUrl: 'screensaver.html',
})
export class ScreensaverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    setTimeout(function(){
      navCtrl.push(LoginPage,{animate: true, animation: 'transition', duration: 300, direction: 'forward'});
    },5000)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScreensaverPage');
  }

}
