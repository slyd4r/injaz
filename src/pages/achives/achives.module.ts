import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AchivesPage } from './achives';

@NgModule({
  declarations: [
    AchivesPage,
  ],
  imports: [
    IonicPageModule.forChild(AchivesPage),
  ],
})
export class AchivesPageModule {}
