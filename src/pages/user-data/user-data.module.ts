import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserDataPage } from './user-data';

@NgModule({
  declarations: [
    UserDataPage,
  ],
  imports: [
    IonicPageModule.forChild(UserDataPage),
  ],
})
export class UserDataPageModule {}
