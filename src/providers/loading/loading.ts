import { Injectable } from '@angular/core';
import { LoadingController } from '../../../node_modules/ionic-angular';

/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadingProvider {
loader;
  constructor(private loadCtrl:LoadingController) {
    console.log('Hello LoadingProvider Provider');
  }
  pop(){
    let loader;
    this.loader=this.loadCtrl.create({
      spinner:"crescent",
      content:'now loading...',
      cssClass:'myLoading'
    })
    this.loader.present();
   
  }
  remove(){
    this.loader.dismiss()
  }
}
