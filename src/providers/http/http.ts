import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';

import {HttpAngularProvider} from '../http-angular/http-angular';
import {HttpNativeProvider} from '../http-native/http-native';

@Injectable()
export class HttpProvider {
    public http;

    constructor(private platform: Platform, private angularHttp: HttpAngularProvider, private nativeHttp: HttpNativeProvider) {
        this.http = this.platform.is('cordova') ? nativeHttp : angularHttp;
        if (this.platform.is('cordova')){
          console.log('natiiiiive')
        }

        
    }
    public get(url: string, params?: any, options?: any) {
      return this.http.get(url, params, options);
  }

  public post(url: string, params?: any, options?: any) {
      return this.http.post(url, params, options);
  }
}