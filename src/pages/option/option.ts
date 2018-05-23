import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {HomePage} from "../home/home";
import {LoginPage} from "../login/login";
import {DatabaseProvider} from "../../providers/database/database";
import {Http} from "@angular/http";
import {FirstPage} from "../first/first";
import {LoginkioskPage} from "../loginkiosk/loginkiosk";
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
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
  expenses: any = [];
  developer = {};
  location:any;
  timer;
  constructor(public navCtrl: NavController, public navParams: NavParams
              ,public http:Http,private storage: Storage,private sqlite: SQLite) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionPage');
  }
  submit(){
    // this.native.setItem("location",this.location);
    console.log("Location->" + this.location);
    // this.storage.set('location', this.location);
    // this.databaseprovider.updateLocation(this.location);
    this.getData();
    this.navCtrl.push(LoginkioskPage);
  }
  // loadDeveloperData() {
  //   this.databaseprovider.getAllDevelopers().then(data => {
  //     this.databaseprovider.getLocation().then(location=>{
  //       this.developers = data;
  //       console.log(data);
  //       // this.developers.forEach(functionToIterate);
  //       for(let dev of this.developers)
  //       {
  //         // console.log(dev.firstname + "->" + dev.lastname + "->" + dev.email);
  //         console.log(dev.name + "->" + "->" + dev.email + "->" + dev.click_time);
  //         this.sentReferWithImageToServer(dev.name,dev.employee_id,dev.click_time,dev.email,dev.image,location);
  //         setTimeout(300)
  //       }
  //     })
  //
  //   })
  // }
  sentReferWithImageToServer(name,employee_id, click_time, email,image,location){
    let body = new FormData();
    let date = new Date(new Date().toISOString());

    body.append('location', location);
    body.append('name',name);
    body.append('mobile',"NA");
    body.append('email',email);
    body.append('photo_base_64',image);
    body.append('clicked_on',click_time);
    body.append('employee_id',employee_id);
    body.append('user_id',"accenture");
    body.append('password',"A#123");
    let headers = new Headers();
    let opt = { headers: headers };
    this.http.post('http://rayqube.com/projects/accenture_photobooth/saveclick_rest/', body).subscribe(data => {
      console.log(data);
      let data_to_use = data.json();
      console.log(data_to_use);
    });
  }
  sync(){
    // this.loadDeveloperData();
  }

  getData() {
    let env = this;
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS location(rowid INTEGER PRIMARY KEY, location TEXT)', {})
        .then(res => {
          env.saveData();
        })
        .catch(e => console.log(e));

    }).catch(e => console.log(e));
  }


  saveData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO location VALUES(NULL,?)',[this.location])
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);

        });
    }).catch(e => {
      console.log(e);

    });


  }


}
