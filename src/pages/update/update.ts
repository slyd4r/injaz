import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Alert, AlertController, LoadingController } from 'ionic-angular';

import 'rxjs/operator/map';
import{finalize} from "rxjs/operators"
import "rxjs/add/operator/map";
import { UserProvider } from '../../providers/user/user';
import { HttpProvider } from '../../providers/http/http';

import { Network } from '../../../node_modules/@ionic-native/network';

import 'rxjs/add/observable/fromPromise';

import { fromPromise } from '../../../node_modules/rxjs/observable/fromPromise';
import { HTTP } from '@ionic-native/http';
import { Storage } from '@ionic/storage';
import { ServerProvider } from '../../providers/server/server';
/**
 * Generated class for the UpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update',
  templateUrl: 'update.html',
})
export class UpdatePage {
 error 
  httpClient;
  
  online:boolean;
  constructor(private nHttp:HTTP,public navCtrl: NavController,private network:Network,private menuCtrl:MenuController,private loadingController:LoadingController,private alertCtrl:AlertController,
     public navParams: NavParams,private httpProvider:HttpProvider,private userProvider:UserProvider , 
     private serverProvider:ServerProvider) {
     
    this.httpClient= httpProvider.http
    menuCtrl.swipeEnable(false)
  }
async get_data(){
  let msg
  let myData=''
  
const loading = await this.loadingController.create({
  content: 'جاري التحميل',
  cssClass:'myLoading'
});
await loading.present();
  this.serverProvider.get_data().subscribe(res=>{
    loading.dismiss()
    for (let ach of res){
      var date = new Date(ach.date)
      if(date >= this.userProvider.starting_date && date.getDay()!=5 && date.getDay()!=6){
        this.userProvider.data[date.getDay()].push(ach)
        console.log('accc')
      }
    }
    console.log('data is ',this.userProvider.data)
  },err=>{
    loading.dismiss()

    console.log('there was erro ',err)
  })
}
  displayNetworkUpdate(connectionState: string){
    if (connectionState=="online"){
       this.online=true
    }
    else{
      this.online=false
    }
    
   }
  ionViewDidLoad() {
      this.get_data()
    
  }
  async getUpdates(){
    let msg
    let myData=''
    
  const loading = await this.loadingController.create({
    content: 'جاري التحميل',
    cssClass:'myLoading'
});
await loading.present();
this.serverProvider.get_updates()
  .subscribe(resp =>{
    },error =>{
      console.log('there was error abd its ',error)
      this.error=true
      if (error.status == 403){
        window.open(this.userProvider.web,'_system')
      }else{
        this.error=true
        this.userProvider.offline = true
        this.continue()
      }
    })
    
  }

  refresh(refresher){
    this.getUpdates()
    setTimeout(() =>{
      refresher.complete();
    },2000);
  }
  continue(){
    this.userProvider.refreshDetails()
    //this.userProvider.login('log')
    this.menuCtrl.swipeEnable(true)
  }
 
  achives(){
    this.navCtrl.push('DaysPage')
  }
  users(){
    this.navCtrl.push("UsersPage")
  }
  add(){
    this.navCtrl.push('AddUsersPage')
  }
  settings(){
    this.navCtrl.push("settings")
  }
  users_app(){
    this.navCtrl.push("LoginPage")

  }
}
