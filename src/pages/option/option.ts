import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NativeStorage} from "@ionic-native/native-storage";
import {HomePage} from "../home/home";
import {LoginPage} from "../login/login";
import {DatabaseProvider} from "../../providers/database/database";
import {Http} from "@angular/http";


/**
 * Generated class for the OptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-option',
  templateUrl: 'option.html',
})
export class OptionPage {
  username:any;
  password:any;
  developers = [];
  refer = [];
  developer = {};
  location:any;
  timer;
  constructor(public navCtrl: NavController, public navParams: NavParams,public native:NativeStorage
              ,public databaseprovider:DatabaseProvider,public http:Http) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionPage');
  }
  submit(){
    this.native.setItem("location",this.location);
    this.native.setItem("time",this.timer);
    console.log(this.location +" " + this.timer);
    this.navCtrl.push(LoginPage);
  }
  loadDeveloperData() {
    this.databaseprovider.getAllDevelopers().then(data => {
      this.developers = data;
      console.log(data);
      // this.developers.forEach(functionToIterate);
      for(let dev of this.developers)
      {
        // console.log(dev.firstname + "->" + dev.lastname + "->" + dev.email);
        console.log(dev.name + "->" + "->" + dev.email + "->" + dev.click_time);
        this.sentReferWithImageToServer(dev.name,dev.click_time,dev.email,dev.image);
        setTimeout(300)
      }
    })
  }
  sentReferWithImageToServer(name, click_time, email,image){
    let body = new FormData();
    let date = new Date(new Date().toISOString());

    body.append('location', "Dubai Police photo booth");
    body.append('name',name);
    body.append('mobile',"NA");
    body.append('email',email);
    body.append('photo_base_64',image);
    body.append('clicked_on',click_time);
    body.append('user_id',"dubai_police");
    body.append('password',"DP#123");
    let headers = new Headers();
    let opt = { headers: headers };
    this.http.post('http://rayqube.com/projects/dubai_police_photobooth/saveclick_rest/', body).subscribe(data => {
      console.log(data);
      let data_to_use = data.json();
      console.log(data_to_use);
    });
  }
  sync(){
    this.loadDeveloperData();
  }
}
