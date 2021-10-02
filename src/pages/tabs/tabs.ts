import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';



@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  homePage="CategoryPage";
  favourite="FavouritePage";
  accountPage='LogRegPage';
  my_msgs='MyMsgsPage';
  //loginPage='LogRegPage';
logged=false;//registered
constructor(private events:Events,private userProvider:UserProvider){
  events.subscribe('loggedOut',goCat=>{
   this.logged= false
   this.refresh()
   })
   events.subscribe('registered',goCat=>{
    if(userProvider.name != null){
      if(userProvider.name !=''){
        this.logged=true
        this.refresh()
      }
    }
    else{
      this.logged=false
      this.refresh()
    }
   })
   if(userProvider.name != null){
    if(userProvider.name !=''){
      this.logged=true
      this.refresh()
    }
  }
  else{
    this.logged=false
      this.refresh()
  }
  
}
 refresh(){
  if(this.logged==true){
    this.accountPage='AccountPage'
  }
  else{
    this.accountPage='LogRegPage'
  }
 }

}
