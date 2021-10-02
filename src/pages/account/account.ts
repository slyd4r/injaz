import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, App } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({

  selector: 'page-account',
  templateUrl: 'account.html', 
})
export class AccountPage {
  @ViewChild('addressInput') addressInput;
name:string;
phone;
whatsapp;
address:string;
location;
edit=false;
  constructor(public navCtrl: NavController,private app:App, public navParams: NavParams
    ,public userProvider:UserProvider,private events:Events) {

    if(userProvider.username =='' || userProvider.username==null){
      navCtrl.setRoot('LogRegPage')
    }
   
    events.subscribe('updated',pop=>{
      
    
      this.app.getRootNav().setRoot('TabsPage')
      console.log('adadad')
    })
  }


  contact(){
    this.app.getRootNav().push('ContactPage')
  }
  keyUpeChecker(event:any){
    //let newValue = event.target.value;
    console.log('key ois ',event)
    let regExp=new RegExp('^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z0-9?+ ]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$');
    if(! regExp.test(event)){
      this.userProvider.noSymbs()
      return false
    }
    else{ 
     return true
    }
    
  }
  ionViewWillEnter() {
    if(this.navParams.get('address')){
      this.address=this.navParams.get('address')
      this.location=this.navParams.get('loc')
      this.edit=true
    }
    this.name=this.userProvider.name;
  }
  editMap(){

    this.app.getRootNav().push('MapsPage',{'edit':this.address})
  }
  editing(){
    this.edit=true;
    setTimeout(()=>{
      this.addressInput.setFocus()
    },150)
    
  }
  logout(){
    this.userProvider.logout()
  }

}
