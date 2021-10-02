import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, AlertController, App } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  @ViewChild('passwordInput') passwordInput;
  @ViewChild('addressInput') addressInput;
  @ViewChild('phoneInput') phoneInput;
  @ViewChild('unserNameInput') unserNameInput;
  userInfo;
name:string=''
username:string=''
whatsapp:string='+249'
address:string=''
password:string=''
alerted=false;
agreeMent:Boolean ;
privacy_policy_link = ''
  constructor(public navCtrl: NavController,private alertCtrl : AlertController,private app:App , public navParams: NavParams,public userProvider:UserProvider,
    public toastCtrl:ToastController,public events:Events) {
      this.privacy_policy_link = userProvider.privacy_policy
      events.subscribe('newRegister', go =>{
      navCtrl.setRoot('AccountPage')
      })
      

     
  }
  goMap(){
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  keyUpeChecker(event:any){
    //let newValue = event.target.value;
    let regExp=new RegExp(this.userProvider.regVal);//let regExp=new RegExp('^[A-Za-z0-9?+ ]+$');
    if(! regExp.test(event)){
    console.log('key ois ',event)
      this.userProvider.noSymbs()
      return false
    }
    else{
     return true
    }
    
  }
  register(){
    if (this.name==""){
      this.unserNameInput.setFocus()
    }
    else if(!this.keyUpeChecker(this.name)){
      this.unserNameInput.setFocus()
    }
    else if(this.whatsapp==''){
      this.phoneInput.setFocus()
    }
    else if(!this.keyUpeChecker(this.username)){
      this.unserNameInput.setFocus()
    }
    
    else if(this.password==""){
      this.passwordInput.setFocus()
    }
    else if(!this.keyUpeChecker(this.password)){
      console.log('here')
      this.passwordInput.setFocus()
    }
    else{
      console.log('step1')
      this.userProvider.name=this.name
      this.userProvider.username = this.username
      this.userProvider.password=this.password
      
      this.userProvider.register()
     
    

  
  }
}
privacy_policy(){
  window.open(this.userProvider.privacy_policy,'_system')
}

signUp() {
  this.userProvider.register()
}

}
