import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, Keyboard, App, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerProvider } from '../../providers/server/server';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild('userNameInput')userNameInput;
  @ViewChild('userPasswordInput') userPasswordInput;
  username:string=''
  password:string="";
  hacking:boolean=false;
  isLoggedIn:boolean;
  getUserDetail;
  
  register:FormGroup = new FormGroup({
    number:new FormControl('', [Validators.required]),
  })
  constructor(public navCtrl: NavController, public navParams: NavParams ,private uniqueDeviceId:UniqueDeviceID,
    public toastCtrl:ToastController,public userProvider:UserProvider,public storage :Storage,private app:App,
  public events:Events ,private loadingController:LoadingController , private serverProvider:ServerProvider) {
   
  }

  keyUpeChecker(event:any){
    //let newValue = event.target.value;
    console.log('key ois ',event)
    let regExp=new RegExp('^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z0-9?+ ]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$');
    if(! regExp.test(event)){
      this.userProvider.noSymbs()
      this.hacking=true
      return false
    }
    else{
     this.hacking=false
     return true
    }
    
  }
  

  ionViewDidLoad() {
   
    console.log('ionViewDidLoad LoginPage');
  }

    async login(){
      console.log('adding')
     let number = this.register.value['number']
     const loading = await this.loadingController.create({
      content: 'جاري التحميل',
      cssClass:'myLoading',
  });
  loading.present()
  this.serverProvider.login(number).subscribe(res=>{
   
    if(res=='error'){
      this.userProvider.createToast('عفوا المستخدم عير موجود ')

    }else{
      this.userProvider.createToast('تم تسجيل الدخول')
      this.userProvider.user_name = res.name
      this.userProvider.user_number = res.number 
      this.navCtrl.push('UserDataPage')
    }
   
    loading.dismiss()
  },err=>{
    loading.dismiss()
    console.log('there was erro ',err)
  })
  
  
    
  }

 


}
