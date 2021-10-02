import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the DaysPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-days',
  templateUrl: 'days.html',
})
export class DaysPage {
  done = 0;
  remain=0
days = [{name:'الاحد',data:[],done:0,remain:0},
{name:'الاثنين',data:[],done:0,remain:0},
{name:'الثلاثاء',data:[],done:0,remain:0},
{name:'الاربعاء',data:[],done:0,remain:0},
{name:'الخميس',data:[],done:0,remain:0},
{name:'الجمعة',data:[],done:0,remain:0}
      ]
  constructor(public navCtrl: NavController, public navParams: NavParams , private userProvider:UserProvider) {
    let i = 0
    for(let ach of userProvider.data){
      if(ach.length>0){
        this.days[i].data.push(ach)
        for (let ac of ach){
        this.days[i].done+=Number(ac.done)
        this.days[i].remain+=Number(ac.remain)

        
        this.done+=Number(ac.done)
        this.remain+=Number(ac.remain)
        console.log('added ',ac.remain)
      }
     
    }
    i+=1
  }
  this.days.splice(5,1)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DaysPage');
  }
  go_day(i){
    this.navCtrl.push('AchivesPage',{'data':this.days[i]})
  }

}
