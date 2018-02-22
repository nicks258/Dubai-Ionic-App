import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {NativeStorage} from "@ionic-native/native-storage";
import {OptionPage} from "../option/option";
import {el} from "@angular/platform-browser/testing/src/browser_util";

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
  name:string;
  email:string;
  timer;
  constructor(public navCtrl: NavController, public navParams: NavParams,public native:NativeStorage) {
    let time = native.getItem("time").then(data=>{
      this.timer = data;
      console.log("Timer->" + data);
    }).catch(error=>{
      this.timer = 10;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  nextPage(){

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(this.name !=null && this.email != null) {
      if (!re.test(this.email)) {
        // Invalid Email
        alert("Email is not Valid");
      }
      else {
        this.navCtrl.push(HomePage, {name: this.name, email: this.email, timer: this.timer}, {
          animate: true,
          animation: 'transition',
          duration: 300,
          direction: 'forward'
        });
      }
    }
    else {
      alert("Name/Email address not valid");
    }
  }
  options(){
    this.navCtrl.push(OptionPage);
  }
}
