import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {NativeStorage} from "@ionic-native/native-storage";
import {OptionPage} from "../option/option";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  name;
  email;
  timer;
  constructor(public navCtrl: NavController, public navParams: NavParams,public native:NativeStorage) {
    var time = native.getItem("time").then(data=>{
      this.timer = data;
    }).catch(error=>{
      this.timer = 5;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  nextPage(){
    this.navCtrl.push(HomePage,{name:this.name,email:this.email,timer:this.timer},{animate: true, animation: 'transition', duration: 300, direction: 'forward'})
    // if(this.name.length!=0 && this.email.length!=0)
    // {
    //
    // }
    // else {
    //   alert("Name/Email address not valid");
    // }
  }
  options(){
    this.navCtrl.push(OptionPage);
  }
}
