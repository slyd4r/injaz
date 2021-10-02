import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the UserDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-data',
  templateUrl: 'user-data.html',
})
export class UserDataPage {
  circules = [{name:'دائرة الاحوال الشخصية الاولى','id':0},
  {name:'دائرة الاحوال الشخصية الثانية','id':1},{name:'دائرة الاحوال الشخصية الثالثة','id':2},
  {name:'دائرة الاحوال الشخصية الرابعة','id':3},{name:'الدائرة الاولى','id':4},{name:'الدائرة الثانية','id':5}
  ,{name:'الدائرة الثالثة','id':6}
  ,{name:'الدائرة الرابعة','id':7},{name:'الدائرة الخامسة','id':8}]
   data = [[{id: '2', circule: '1', number: '12', name: 'moj', done: '4',remain:3,reason:'no paper'}]]
   canEdit = true
   today=0
   new_achieves=[[]]
   days =['الاحد','الاثنين','الثلاثاء','الاربعاء','الخميس']
  constructor(public navCtrl: NavController, private serverProvider:ServerProvider,
    private userProvider:UserProvider,public navParams: NavParams , private loadingController:LoadingController) {
    
    var date = new Date()
    this.today = date.getDay()
    this.canEdit = this.today<5
    this.canEdit = true
    this.get_data()
  }
  async upload(){
    let msg
    let myData=''
    
  const loading = await this.loadingController.create({
    content: 'جاري التحميل',
    cssClass:'myLoading'
});
await loading.present();

    let new_data = []
    let old_data = []
    for (let arr of this.data){
      console.log('aee ',arr)
      if (arr.length>0){
        old_data.push(arr)
      }
    }
    for (let arr of this.new_achieves){
      if (arr.length>0){
        new_data.push(arr)
      }
    }
    this.serverProvider.update_user_data(old_data,new_data).subscribe(res=>{
      loading.dismiss()
      this.userProvider.createToast("تم التحديث بنجاح")
      this.navCtrl.setRoot("UserHomePage")
      console.log('resaul ewas ',res)

    },err=>{
      loading.dismiss()

      console.log('there was erro ',err)
      this.userProvider.createToast("حدث خطأ")
    })
  }
  async get_data(){
    let msg
    let myData=''
    
  const loading = await this.loadingController.create({
    content: 'جاري التحميل',
    cssClass:'myLoading'
});
await loading.present();

    this.serverProvider.get_user_data(this.userProvider.user_number).subscribe(res=>{
      loading.dismiss()
      for (let ach of res){
        var date = new Date(ach.date)
        if(date >= this.userProvider.starting_date && date.getDay()!=5 && date.getDay()!=6){
          this.userProvider.user_data[date.getDay()].push(ach)
          this.data= this.userProvider.user_data
          this.new_achieves.push([])
          

        }
        
        console.log('data wasz ',this.data)
      }
      
    },err=>{
      loading.dismiss()

      console.log('there was erro ',err)
    })
  }
  add_achieve(i){
    this.new_achieves[i].push({id: '', circule: '', number: this.userProvider.user_number, name: this.userProvider.user_name, done: '',remain:3,reason:''})
    console.log('nw ach ',this.new_achieves)
    
  }

}
