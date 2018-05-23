import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

@Injectable()
export class DatabaseProvider {
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;

  constructor(public sqlitePorter: SQLitePorter, private storage: Storage, private sqlite: SQLite, private platform: Platform, private http: Http) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'kiosk.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.storage.get('database_filled').then(val => {
            if (val) {
              this.databaseReady.next(true);
            } else {
              this.fillDatabase();
            }
          });
        });
    });
  }

  fillDatabase() {
    this.http.get('assets/kiosk.sql')
      .map(res => res.text())
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(data => {
            this.databaseReady.next(true);
            this.storage.set('database_filled', true);
          })
          .catch(e => console.error(e));
      });
  }

  addDeveloper(name,email,image,click_time,location) {
    let data = [name,email,image,click_time,location];
    return this.database.executeSql("INSERT INTO people (name,email,image,click_time,location) VALUES (?, ? , ?, ? ,?)", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  updateLocation(place) {
    let data = [place];
    return this.database.executeSql('UPDATE place SET place = ? WHERE id = ?',[place,1]).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }



  getAllDevelopers() {
    return this.database.executeSql("SELECT * FROM people", []).then((data) => {
      let developers = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          developers.push({
            name: data.rows.item(i).name,
            employee_id: data.rows.item(i).employee_id,
            email: data.rows.item(i).email,
            image: data.rows.item(i).image,
            click_time: data.rows.item(i).click_time,
          });
        }
      }
      return developers;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  getLocation() {
    let place;
    return this.database.executeSql("SELECT * FROM place", []).then((data) => {
      let developers = [];
      if (data.rows.length > 0) {
        place = data.rows.item(0).place
        // for (var i = 0; i < data.rows.length; i++) {
        //   developers.push({
        //     location: data.rows.item(i).location,
        //   });
        // }
      }
      return place;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }



  getAllUnSync() {
    return this.database.executeSql("SELECT * FROM people WHERE sync=1", []).then((data) => {
      let developers = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          developers.push({
            firstname: data.rows.item(i).firstname,
            lastname: data.rows.item(i).lastname,
            phonenumber: data.rows.item(i).phonenumber,
            email: data.rows.item(i).email
          });
        }
      }
      return developers;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
}

