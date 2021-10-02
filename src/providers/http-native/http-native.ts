import {Injectable} from '@angular/core';
import {HTTP} from '@ionic-native/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';

import { fromPromise } from '../../../node_modules/rxjs/observable/fromPromise';
@Injectable()
export class HttpNativeProvider {
    constructor(public http: HTTP) {}

    public get(url, params?: any, options: any = {}) {
        let responseData = this.http.get(url, params, {})
        return Observable.fromPromise(responseData);
    }

    public  post(url, params?: any, options: any = {}) {
        
        this.http.setDataSerializer('json')
        let responseData = this.http.post(url, params ,{})
        .then(resp => options.responseType == 'text' ? resp.data : JSON.parse(resp.data));

        //return fromPromise(responseData);
        return Observable.fromPromise(responseData);
    }
}