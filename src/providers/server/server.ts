import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map'; 
import { Observable } from  'rxjs/Observable'
import { UserProvider } from '../user/user';;
import {finalize} from  'rxjs/operators'
import  'rxjs/add/operator/catch';
import { Events, LoadingController } from '../../../node_modules/ionic-angular';
import { HttpProvider } from '../http/http';

import { map } from 'rxjs/operators/map';
/*
  Generated class for the ServerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServerProvider {
globalCategory:Array<object>
page = 1;
orders;
web='http://localhost/'
failed:false;
ordered:false;
refresh = false
someFound = false;

permi = 'mahtopass';
slyd4rCat='shoes'
  constructor(public http: HttpProvider,private events:Events,private loadingController:LoadingController, 
    private httpClient:HttpProvider , private userProvider:UserProvider) {
    this.get_random()
    
    events.subscribe('web',web =>{
      this.web=web
    })
  }

  get_data(){
    let link = this.userProvider.web+'achieves.php'
    let data=({})
     return this.http.post(link,data).pipe((map(response => response)))

  }
  get_user_data(numb){
    let link = this.userProvider.web+'achieves_for_user.php'
    let data=({numb:numb})
     return this.http.post(link,data).pipe((map(response => response)))
  }
  update_user_data(_old , _new){
    let link = this.userProvider.web+'achieves_update.php'
    let data=({old:JSON.stringify(_old),new:JSON.stringify(_new)})
     return this.http.post(link,data).pipe((map(response => response)))

  }
  get_users(){
    let link = this.userProvider.web+'users_list.php'
    let data=({})
     return this.http.post(link,data).pipe((map(response => response)))
  }
  register(num,name){
    let link = this.userProvider.web+'register.php'
    let data=({numb:num,name:name})
     return this.http.post(link,data).pipe((map(response => response)))
  }

  login(num){
    let link = this.userProvider.web+'login.php'
    let data=({numb:num})
     return this.http.post(link,data).pipe((map(response => response)))
  }
  get_updates(){
    let link = this.userProvider.web+'getUpdates.php'
    let data=({})
     return this.http.post(link,data).pipe((map(response => response)))
  }
  turn_user(phone,status){
    let link = this.userProvider.web+'turn_user.php'
    
    let data=({phone:phone,status})
     return this.http.post(link,data).pipe((map(response => response)))
  }
  get_random(){
    let x = Math.floor(Math.random() *Math.floor(3))
    if (x==0){
      this.slyd4rCat= 'mshoes'
    }
    else if(x == 1){
      this.slyd4rCat = 'tshirt'
    }
    else{
      this.slyd4rCat = 'mtrouser'
    }
    
  }
  getList(page,pro): Observable<string[]>{
    this.page=page
    var myData
    if(pro == ''){
       myData = ({table: this.slyd4rCat,permi:this.permi});
      console.log('dazzz',this.slyd4rCat)
    }
    else{
       myData = ({table: pro,permi:this.permi});
    }
    return this.http.post(this.web+`categoryPage.php?page=${this.page}`,myData).map(res =>res.json())
}

  orderNow(orders,customer,inf): Observable<string[]>{
    this.orders=orders;
    var link = this.web+'order.php';

      let data =this.orders
      var myData = ({name:data.name,price:data.price,permi:this.permi
        ,image:data.image1,username:customer,inf:inf,item:data.id,
        category:data.category,store:data.store,property:data.property,count:data.count});
        return this.http.post(link,myData).map(res =>res.json());
          ///console.log(this.orders[i].get("name")," not found")
  }

}
