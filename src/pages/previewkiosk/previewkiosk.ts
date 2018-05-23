import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";
import {ScreensaverPage} from "../screensaver/screensaver";
import {Http} from "@angular/http";
import {DatabaseProvider} from "../../providers/database/database";
import {FirstPage} from "../first/first";

import {LoginkioskPage} from "../loginkiosk/loginkiosk";
import {Storage} from "@ionic/storage";

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/**
 * Generated class for the PreviewkioskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-previewkiosk',
  templateUrl: 'previewkiosk.html',
})
export class PreviewkioskPage {

  screen;
  imagepath: any;
  developer = {};
  users: any;
  expenses: any = [];
  data;
  timer;
  baseImageString;
  postBody ={};
  employee_id;
  date1;
  developers = [];
  fileName: any;
  name;
  location;
  email;
  date;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http:Http,public loadingCtrl:LoadingController,private storage: Storage,private sqlite: SQLite) {
    // alert("Preview Is On");

    this.date = new Date(new Date().toISOString());
    this.fileName = "data:image/png;base64," + navParams.get('file_name_final');
    this.baseImageString = navParams.get('file_name_final');

    this.email = navParams.get('email');
    this.timer = navParams.get('timer');
    this.employee_id = navParams.get('employee_id');
    // this.imagepath = this.file.dataDirectory + '/' + this.fileName;
    console.log("data-> " + navParams.get('imageBase'));
    let env = this;
    setTimeout(function () {
      console.log("Developer is on command");
      env.addDeveloper();

    },10000)
    // this.addDeveloper();
    // this

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreviewPage');
  }

  addDeveloper() {
    let env= this;
    console.log("Button Clicked addDeveloper()");
    //TODO Code for inserting in sqlite
    this.date1 =   this.date.getFullYear()+'-' + (this.date.getMonth()+1) + '-'+this.date.getDate() + '-' + this.date.getHours() + '-' + this.date.getMinutes() + '-' + this.date.getSeconds();
    console.log("time" + this.date1);
    // this.location = this.storage.get('location');
    // this.databaseprovider.addDeveloper(this.name,this.email,this.baseImageString,this.date1,this.location)
    //   .then(data => {
    //    this.loadDeveloperData();
    //
    //   });
    env.getDatabase();
    this.developer = {};

  }

  loadDeveloperData() {
    // this.location = this.storage.get('location');
    // this.databaseprovider.getLocation().then(place=>{
    //   this.location = place;
    //   console.log("Location -> " + this.location);
    //   this.sendImagesToServer();
    //   // this.developers.forEach(functionToIterate);
    // })
  }

  sendImagesToServer(){
    let loading = this.loadingCtrl.create({
      content: 'Sending email...',
      spinner: 'circles'
    });
    loading.present();
    console.log("Location-> "+this.location);
    let body = new FormData();
    let date = new Date(new Date().toISOString());
    body.append('location', this.location);
    body.append('name',this.email);
    body.append('mobile',"NA");
    body.append('email',this.email);
    body.append('photo_base_64',this.baseImageString);
    body.append('clicked_on',this.date1);
    body.append('employee_id',this.employee_id);
    body.append('user_id',"accenture");
    body.append('password',"A#123");
    this.http.post('http://rayqube.com/projects/accenture_photobooth/saveclick_rest/', body  ).subscribe(data => {
      loading.dismiss();



      console.log(data);
      this.navCtrl.push(LoginkioskPage,{},{animate: true, animation: 'transition', duration: 300, direction: 'forward'});
      // let data_to_use = data.json();
      // console.log(data_to_use);
      // loadingPopup.dismiss();
    },error2 => {
      loading.dismiss();
      console.log(error2);
      // loadingPopup.dismiss();
      this.navCtrl.push(LoginkioskPage,{},{animate: true, animation: 'transition', duration: 300, direction: 'forward'});
      console.log("error->" + error2);
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

  getDatabase() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS location(rowid INTEGER PRIMARY KEY, location TEXT)', {})
        .then(res => console.log('Executed SQL'))
        .catch(e => console.log(e));
      db.executeSql('SELECT * FROM location ORDER BY rowid DESC', {})
        .then(res => {
          this.expenses = [];
          for(var i=0; i<res.rows.length; i++) {
            this.expenses.push({rowid:res.rows.item(i).rowid,location:res.rows.item(i).location})
            console.log("locaqtion data-> " + res.rows.item(i).location)
            this.location = res.rows.item(i).location;
          }
          this.sendImagesToServer();
        })
        .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

}
