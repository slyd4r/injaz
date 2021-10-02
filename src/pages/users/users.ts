import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  names = []
  type ;
  constructor(public navCtrl: NavController,public app:App, private loadingController:LoadingController,
    private navParams:NavParams, private serverProvider:ServerProvider,private userProvider:UserProvider) {
     
    }
    ionViewDidLoad() {
      this.loadUsers()
    }
    async loadUsers(infiniteScroll?) {
      const loading = await this.loadingController.create({
        content: 'جاري التحميل',
        cssClass:'myLoading',
    });
    loading.present()
    this.serverProvider.get_users().subscribe(res=>{
      console.log('res was ',res)
      this.names = this.names.concat(res)
      console.log('data is ',this.names)
      loading.dismiss()
    },err=>{
      loading.dismiss()
      console.log('there was erro ',err)
    })


    }
   
    loadMore(event){

    }

  refresh(refresher){
    this.names = []
    this.loadUsers()
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  
  }
 

}