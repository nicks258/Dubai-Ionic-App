import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CameraPreview } from '@ionic-native/camera-preview';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {ScreensaverPage} from "../pages/screensaver/screensaver";
import {SQLitePorter} from "@ionic-native/sqlite-porter";
import {SQLite} from "@ionic-native/sqlite";
import {IonicStorageModule} from "@ionic/storage";
import {HttpModule} from "@angular/http";
import { DatabaseProvider } from '../providers/database/database';
import {NativeStorage} from "@ionic-native/native-storage";
import {LoginPage} from "../pages/login/login";
import {PreviewPage} from "../pages/preview/preview";
import {OptionPage} from "../pages/option/option";
import {ScreenOrientation} from "@ionic-native/screen-orientation";
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PreviewPage,
    OptionPage,
    LoginPage,
    ScreensaverPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{scrollAssist:false,
                                    autoFocusAssist:false})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ScreensaverPage,
    OptionPage,
    LoginPage,
    PreviewPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CameraPreview,
    HttpModule,
    ScreenOrientation,
    NativeStorage,
    SQLitePorter,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider
  ]
})
export class AppModule {}
