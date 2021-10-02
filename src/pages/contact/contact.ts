import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  pageName:string;
  constructor(public navCtrl: NavController,private callnomber:CallNumber,private userProvider:UserProvider, public navParams: NavParams) {
    this.pageName=navParams.get('name')

  }
  
  logout(){
    this.userProvider.logout()
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }
  contact(x){
    console.log('ypu are ',x)
    if(x=='c'){
      console.log(this.userProvider.contact.phone)
      this.callnomber.callNumber(this.userProvider.contact.phone, true)
    }
    else if(x == 'w'){
      window.open('https://api.whatsapp.com/send?phone='+this.userProvider.contact.whatsapp,'_system')
    }
    else if(x == 'i'){
      window.open('https://instagram.com/'+this.userProvider.contact.instagram,'_system')
    }
  }

}
