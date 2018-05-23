import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DisclamerPage} from "../disclamer/disclamer";
import {OptionPage} from "../option/option";

/**
 * Generated class for the FirstPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-first',
  templateUrl: 'first.html',
})
export class FirstPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstPage');
  }
 nextPage(){
   this.navCtrl.push(DisclamerPage, {}, {
     animate: true,
     animation: 'transition',
     duration: 300,
     direction: 'forward'
   });
 }
  options(){
    this.navCtrl.push(OptionPage);
  }
}
