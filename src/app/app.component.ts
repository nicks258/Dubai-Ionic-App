import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreensaverPage } from '../pages/screensaver/screensaver';
import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {PreviewPage} from "../pages/preview/preview";
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {FirstPage} from "../pages/first/first";
import {DisclamerPage} from "../pages/disclamer/disclamer";
import {LoginkioskPage} from "../pages/loginkiosk/loginkiosk";
import {CamerakioskPage} from "../pages/camerakiosk/camerakiosk";
import {PreviewkioskPage} from "../pages/previewkiosk/previewkiosk";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginkioskPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public screenOrientation:ScreenOrientation) {
    platform.ready().then(() => {
      this.screenOrientation.lock('portrait');
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

