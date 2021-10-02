import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AchivesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-achives',
  templateUrl: 'achives.html',
})
export class AchivesPage {
achieves ;
data = []
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.achieves = navParams.get('data')
    console.log('length is  ',this.achieves.data[0])
    this.data = this.achieves.data[0]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AchivesPage');
  }

}
