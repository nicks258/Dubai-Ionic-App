import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {OptionPage} from "../option/option";

import {DisclamerPage} from "../disclamer/disclamer";
import {CamerakioskPage} from "../camerakiosk/camerakiosk";

/**
 * Generated class for the LoginkioskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loginkiosk',
  templateUrl: 'loginkiosk.html',
})
export class LoginkioskPage {
  email:string;
  employee_id:string;
  timer;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginkioskPage');
  }
  nextPage(){

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.email = this.email + "@accenture.com"
    if(this.email != null && this.employee_id != null) {
      if (!re.test(this.email) ) {
        // Invalid Email
        alert("Email is not Valid");
        console.log("Email  invalid");
      }
      else {
        if (this.email.endsWith("@accenture.com"))
        {
          console.log("Email is valid");
          console.log(this.email);
        this.navCtrl.push(CamerakioskPage, {email: this.email, timer: this.timer, employee_id: this.employee_id}, {
          animate: true,
          animation: 'transition',
          duration: 300,
          direction: 'forward'
        });
        }
        else {
          console.log("Email is not invalid");
          alert("Email is not Valid");
        }
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
