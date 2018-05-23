import {Component, Input} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import {PreviewPage} from "../preview/preview";
import {NativeStorage} from "@ionic-native/native-storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  baseImagePath;

  file_name_final : any;
  timer;
  email;
  // peopleDetail = {
  //   name:'',
  //   email:'',
  //   phone_number:''
  // };
  // phone_number;
  name;
  task: any;
  cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: window.screen.width,
    height: window.screen.height,
    camera: 'front',
    tapPhoto: false,
    previewDrag: false,
    toBack: true,
    alpha: 1,


  };

  picture;

  pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  };
  constructor(public navCtrl: NavController,private cameraPreview: CameraPreview,
              public navParams: NavParams,public native:NativeStorage) {

    this.name = navParams.get('name');
    this.email = navParams.get('email');
    this.timer = navParams.get('timer');
    this.initTimer();
    this.startTimer();
  }
  timeInSeconds: number;
  show: boolean;
  time: number;
  remainingTime: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;

  ngOnInit() {

  }

  initTimer() {
    //Timer for 20 secs
    if (!this.timeInSeconds) { this.timeInSeconds = 10; }

    this.time = this.timeInSeconds;
    this.runTimer = false;
    this.hasStarted = false;
    this.hasFinished = false;
    this.remainingTime = this.timeInSeconds;

    this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
  }

  startTimer() {
    this.startCamera();
    this.runTimer = true;
    this.hasStarted = true;
    this.timerTick();
  }

  pauseTimer() {
    this.runTimer = false;
  }

  resumeTimer() {
    this.startTimer();
  }

  timerTick() {
    setTimeout(() => {

      if (!this.runTimer) { return; }
      this.remainingTime--;
      this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
      if (this.remainingTime > 0) {
        this.timerTick();
      }
      else {
        this.hasFinished = true;
        this.takeImage();
      }
    }, 1000);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0"      + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    if(parseInt(secondsString)==0)
    {
      this.show = false;
    }
    // else if(parseInt(secondsString)==4)
    // {
    //   this.show = false;
    // }
    else {
      this.show = true;
    }
    return secondsString;
  }
  startCamera(){
    this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
      (res) => {

        // alert(res);
        //
        // /*




      },
      (err) => {
        console.log(err);
        alert(err);
      });
  }
  takeImage(){
    this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpg;base64,' + imageData;
      const img: string = imageData;
      const bytes: string = atob(img);

      // this.screenshot.save('jpg', 80, 'myscreenshot').then(msg=>{
      //   alert("Wow" + msg.fileName);
      // }).catch(error=>{
      //   alert("Opps" + error);
      // });

      // this.screenShotSave();

      const byteNumbers = new Array(bytes.length);
      for (let i = 0; i < bytes.length; i++) {
        byteNumbers[i] = bytes.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      // this.base64ToGallery.base64ToGallery(this.picture, { prefix: '_img' }).then(
      //   res => console.log('Saved image to gallery ', res),
      //   err => console.log('Error saving image to gallery ', err)
      // );
      const blob: Blob = new Blob([byteArray], { type: 'image/png' });
      this.file_name_final = imageData;
      // this.screenshot.URI(20).then(res => {
      //   console.log("BASE->>>> "+res.URI);
      //   alert(res.URI);
      //   // let picture = 'data:image/png;base64,' + res.URI;
      //   this.baseImagePath = res;
      //   this.base64ToGallery.base64ToGallery(res.URI, { prefix: '_img' }).then(
      //     res => console.log('Saved image to gallery ', res),
      //     err => console.log('Error saving image to gallery ', err)
      //   );
        this.cameraPreview.stopCamera();
        this.openPreview();
      //   // this.base64ToGallery.base64ToGallery(picture, { prefix: '_img' }).then(
      //   //   res => console.log('Saved image to gallery ', res),
      //   //   err => console.log('Error saving image to gallery ', err)
      //   // );
      //   // this.navCtrl.push(HomescreenPage)
      //   // this.state = true;
      // });

    }, (err) => {
      console.log(err);

    });
    // this.task = setTimeout( () => {
    //   this.openPreview();
    // }, 500);

  }
  openPreview(){
    let nav = this.navCtrl;
    console.log("Next Page");
    nav.push(PreviewPage, {name:this.name,email:this.email, file_name_final:this.file_name_final,imageBase:this.baseImagePath});
  }


}
