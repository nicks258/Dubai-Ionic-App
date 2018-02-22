import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";
import {Http} from "@angular/http";
import {ScreensaverPage} from "../screensaver/screensaver";
import {HomePage} from "../home/home";

/**
 * Generated class for the PreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preview',
  templateUrl: 'preview.html',
})
export class PreviewPage {

  screen;
  imagepath: any;
  developer = {};
  users: any;
  data;
  timer;
  baseImageString;
  postBody ={};
  date1;
  developers = [];
  fileName: any;
  name;
  email;
  date;
  constructor(public navCtrl: NavController, public navParams: NavParams,public databaseprovider:DatabaseProvider,
                public http:Http,public loadingCtrl:LoadingController) {
     this.date = new Date(new Date().toISOString());
    this.fileName = "data:image/png;base64," + navParams.get('file_name_final');
    this.baseImageString = navParams.get('file_name_final');
    this.name = navParams.get('name');
    this.email = navParams.get('email');
    this.timer = navParams.get('timer');
    // this.imagepath = this.file.dataDirectory + '/' + this.fileName;
    console.log("data-> " + navParams.get('imageBase'));
    // this
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreviewPage');
  }

  addDeveloper() {

    console.log("Button Clicked addDeveloper()");
    //TODO Code for inserting in sqlite
    this.date1 =   this.date.getFullYear()+'-' + (this.date.getMonth()+1) + '-'+this.date.getDate() + '-' + this.date.getHours() + '-' + this.date.getMinutes() + '-' + this.date.getSeconds();
    console.log("time" + this.date1);
    this.databaseprovider.addDeveloper(this.name,this.email,this.baseImageString,this.date1)
      .then(data => {
        this.sendImagesToServer();
      });
    // this.sendToServer();
    this.developer = {};

  }

  sendImagesToServer(){
    let loading = this.loadingCtrl.create({
      content: 'Sending email...',
      spinner: 'circles'
    });
    loading.present();
    let body = new FormData();
    let date = new Date(new Date().toISOString());
    body.append('location', "Dubai Police photo booth");
    body.append('name',this.name);
    body.append('mobile',"NA");
    body.append('email',this.email);
    body.append('photo_base_64',this.baseImageString);
    body.append('clicked_on',this.date1);
    body.append('user_id',"dubai_police");
    body.append('password',"DP#123");
    this.http.post('http://rayqube.com/projects/dubai_police_photobooth/saveclick_rest/', body  ).subscribe(data => {
      loading.dismiss();
      this.navCtrl.push(ScreensaverPage,{},{animate: true, animation: 'transition', duration: 300, direction: 'forward'});
      // console.log(data);
      // let data_to_use = data.json();
      // console.log(data_to_use);
      // loadingPopup.dismiss();
    },error2 => {
      loading.dismiss();
      // loadingPopup.dismiss();
      this.navCtrl.push(ScreensaverPage,{},{animate: true, animation: 'transition', duration: 300, direction: 'forward'});
      // console.log("error->" + error2);
    });
  }
  // loadDeveloperData() {
  //   this.databaseprovider.getAllDevelopers().then(data => {
  //     this.developers = data;
  //     console.log(data);
  //   })
  // }
  submit(){
      this.addDeveloper();
  }
  reShoot(){
    this.navCtrl.push(HomePage,{name:this.name,email:this.email,timer:this.timer});
  }

}
