import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http'; 
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserProvider } from '../providers/user/user';
import { IonicImageLoader } from 'ionic-image-loader';
import { IonicStorageModule } from '@ionic/storage';

import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Device } from '@ionic-native/device';
import { ServerProvider } from '../providers/server/server';
import { Network } from '@ionic-native/network';
import { HttpModule } from '@angular/http';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Clipboard } from '@ionic-native/clipboard';
import { CallNumber } from '@ionic-native/call-number'
import { LoadingProvider } from '../providers/loading/loading';
import { SocialSharing } from '@ionic-native/social-sharing';
import { HttpAngularProvider } from '../providers/http-angular/http-angular';
import { HttpNativeProvider } from '../providers/http-native/http-native';
import { HTTP } from '../../node_modules/@ionic-native/http';
import { HttpProvider } from '../providers/http/http';
import {envronment} from '../app/environment';
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [ 
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp),HttpClientModule,IonicImageLoader.forRoot(),IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [Network,HTTP,
    StatusBar,Device,Clipboard,
    SplashScreen,LocationAccuracy,AndroidPermissions,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    ServerProvider,CallNumber,
    LoadingProvider,
    HttpAngularProvider,SocialSharing,
    HttpNativeProvider,UniqueDeviceID,
    HttpProvider
  ]
})
export class AppModule {}
