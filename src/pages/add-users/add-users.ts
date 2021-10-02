import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerProvider } from '../../providers/server/server';
import { UserProvider } from '../../providers/user/user';
import { HttpProvider } from '../../providers/http/http';

import{finalize} from "rxjs/operators"
import "rxjs/add/operator/map";
/**
 * Generated class for the AddUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-users',
  templateUrl: 'add-users.html',
})
export class AddUsersPage {
  httpClient
  register:FormGroup = new FormGroup({
    number:new FormControl('', [Validators.required]),
    name:new FormControl('', [Validators.required]),
  })
  constructor(public navCtrl: NavController, public navParams: NavParams , private userProvider:UserProvider,
    protected loadingController:LoadingController,private serverProvider:ServerProvider ,
     private httpProvider:HttpProvider) {
       this.httpClient  = httpProvider.http
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddUsersPage');
  }
  async add(){
    console.log('adding')
   let number = this.register.value['number']
   let name = this.register.value['name']
   const loading = await this.loadingController.create({
    content: 'جاري التحميل',
    cssClass:'myLoading',
});
loading.present()
this.serverProvider.register(number,name).subscribe(res=>{
  console.log('res was ',res)
  if(res=='success'){
    this.userProvider.createToast('تم الاضافة بنجاح')
  }else{
    this.userProvider.createToast('عفوا المستخدم موجود مسبقا')

  }
 
  loading.dismiss()
},err=>{
  loading.dismiss()
  console.log('there was erro ',err)
})


  }
}
