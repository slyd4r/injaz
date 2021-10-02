import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { Events, LoadingController, ToastController, AlertController, Platform, App } from 'ionic-angular';

import "rxjs/add/operator/map";
import { finalize } from 'rxjs/operators';
import { HttpProvider } from '../http/http';

@Injectable()
export class UserProvider {
  //web ='http://localhost/achives_apps/';

  web= 'https://slyd4r.net/apps/achives_apps/'
  //web ='http://192.168.43.102/'
  loader;
  
  browser:boolean;
  privacy_policy = ''
  name;//'omhamed';
  username='';
  password:string;
  
  contactUs=[];
  contact;
  messages=[]
  can_message = 0;
  device_id = ''
  favourite_ids=[]
  favourite=[]
  my_msgs = []
  http;
  offline:boolean;
  do_refresh = false;
  current_day  = new Date()
  starting_date  :Date = new Date
  categories = []
  user_name = ''
  user_number = ''
  permi = 'mahtopass';
  data = [[],[],[],[],[]]
  user_data= [[],[],[],[],[]]
   regVal = '^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF-\u0660-\u0669a-zA-Z0-9?+@+.+_+ ]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$';
  
  //signal_app_id = '6c414fb7-1b80-4911-aac4-d7c7d7399b11'//'931f6f41-2c4d-498d-a617-02f34bce2b86';
  //firebase_id = '926458510685'//'628124979388'
  constructor(private app:App,public storage:Storage,private platform:Platform,
    public toastCtrl:ToastController , 
    public events:Events,public loadCtrl:LoadingController,private alertCtrl:AlertController,public httpProvider:HttpProvider) {
      //this.initialize()
    while (this.starting_date.getDay() >0){
      this.starting_date.setDate(this.starting_date.getDate()-1)
    }
  this.starting_date.setHours(0,0,0,0);
      this.http = httpProvider.http;
   
     
    events.publish('web',this.web)
    
    
   //this.save()
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      
    });
    this.get_storage()
  }
  
 async get_storage(){
   if (this.offline){
    await this.storage.get('messages').then(res=>{
      this.messages = res
      if (this.messages ==null){
        this.messages = []
      }
      console.log('messsages where ',this.messages)
    }).catch(err=>{
      this.createToast('internet connection failed')
    })
     this.storage.get('contact').then(res=>{
      this.contact = res
    })
    this.storage.get('categories').then(res=>{
      this.categories = res
    })
   }
   else{
    this.storage.set('contact',this.contact)
    this.storage.set('categories',this.categories)
   }
  
  await this.storage.get('username').then(res=>{
    this.username = res
  })
  await this.storage.get('name').then(res=>{
    this.name = res
  })
  await this.storage.get('password').then(res=>{
    this.password = res
    console.log('pass s ',res)
    if(this.username != null && this.username!=''){
      this.login('')
      console.log('inisssaaaaaat cread is ',this.password)
    }
  })
  await this.storage.get('messages').then(res=>{
    if (res != '' && res != null){
      this.messages = res
    }
  })
 await console.log('data ',this.username,' ',this.password)
 }
 cache_msg(){
   console.log('cahing mesages ',this.messages)
   this.storage.set('messages',this.messages)
 }
  save(){
    this.storage.set('name',this.name)
    this.storage.set('password',this.password)
    this.storage.set('username',this.username)
    console.log('cread saved ',this.password)
  }
  
  createToast(message){
    this.toastCtrl.create({
      message: message,
      duration: 3000
      
    }).present();
  }
  
  noSymbs(){
    this.createToast('   ممنوع استخدام الاحرف الخاصة , استخدم الاحرف و الارقام فقط')
  }

  loading(){
    this.loader=this.loadCtrl.create({
      spinner:"crescent",
      content:'now loading...'
      ,cssClass:'myLoading'
    })
    this.loader.present();
  }

  refreshDetails(){
    let opened
    this.storage.get('name').then(val=>{
      this.name=val
      this.storage.get('opened').then(val =>{
        opened = val
      })
      if(this.name == "" || this.name == null && opened == false){
        this.save()
      }
      this.events.publish('registered')
    }).catch((error)=>{
    })
   
    this.storage.get('password').then(val=>{
      this.password=val
    })
    this.get_storage()
   
  }

  create_toast(text){
    this.toastCtrl.create({
      message:text,
      duration: 3000
      
    }).present();
  }
  login(status){
    this.loading()
    console.log('cread ',this.username, ' and ',this.password)
    var link = this.web+'login.php';
    var myData = ({username:this.username,password:this.password,permi:this.permi});
    this.http.post(link, myData)
    .subscribe(data => {
    if (data != 'wrongnameyoucantgetitok'){
     console.log('data was ',data)
     this.can_message = data.can_message;
     this.name = data.name
     
     this.save()
     if(data.favourite != null && data.favourite !=''){
      this.favourite_ids = data.favourite.split(',');
     }else{
       this.favourite_ids = []
     }
     console.log('fav ids is ',this.favourite_ids)
      this.events.publish('registered')
      
    }
    else{
      this.toastCtrl.create({
        message: '   خطأ في رقم اسم المستخدم او كلمة المرور',
        duration: 5000
        
      }).present();
    
      //this.refreshDetails()
        
    } //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
    }, error => {
      console.log('errrrr ',error)
      this.toastCtrl.create({
    
        message: 'حدث خطأ ما !',
        duration: 5000
        
      }).present();
    });
    this.loader.dismiss()
  }
  register(){
    //this.phone="0123017901"
    var link = this.web+'register.php';
    this.loading()
    var myData = ({device_id:this.device_id,username:this.username,password:this.password,name:this.name,permi:this.permi});
    
    this.http.post(link, myData).pipe
      (finalize(()=>{
        
    }))
    .subscribe(data => {
      this.loader.dismiss()
    if(data=="done"){
      this.save()
      //this.login('reg');
      
      this.events.publish('newRegister')

      this.toastCtrl.create({
        
        message: 'تم التسجيل بنجاح',
        duration: 6000
      }).present();
    }
    else if (data == 'registered_before'){
      this.toastCtrl.create({
    
        message: 'هذا الاسم مستخدم مسبقا',
        duration: 3000
        
      }).present();
      
    }
    else if (data == 'multiple_registered'){
      this.toastCtrl.create({
        message: 'لا يمكنك انشاء حساب من نفس الجهاز أكثر من 3 مرات',
        duration: 3000
        
      }).present();
    }
    
    //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
    }, error => {
      console.log('errorrrrrrr ',error)
      this.toastCtrl.create({
    
        message: 'حدث خطأ ما'+error,
        duration: 6000
        
      }).present();
    });
    
  }
  logout(){

    this.storage.remove('name')
    this.storage.remove('username')
    this.storage.remove('password')
    this.storage.remove('favourite')
    this.favourite = []
   this.name=null;
   this,this.username = null
   this.password = null
   this.events.publish('loggedOut')
  
   
  }

  


}
