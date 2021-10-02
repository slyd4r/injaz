import { Component, ViewChild, enableProdMode } from '@angular/core';
import { Nav, Platform, Events, ToastController, Config, ModalController, AlertController, App, IonicApp, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UserProvider } from '../providers/user/user';
import { ImageLoaderConfig } from 'ionic-image-loader';

import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';

enableProdMode();

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  currentPage:string='الرئيسية'
  accountPage= { title: 'اعدادات حسابي', component: "AccountPage" ,icon:'person'}
  contactPage =  { title: 'contact us', component: "ContactPage" ,icon:'person'}
  login= { title:'login', component: "LoginPage" ,icon:''}
  userName:string;
  haveCoords=false;
  rootPage: any;
  pages: Array<{title: string, component: any,icon:any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public imageLoaderConfig:ImageLoaderConfig,public userProvider:UserProvider,
    public splashScreen: SplashScreen,public toastCtrl:ToastController,public config:Config,private menuCtrl:MenuController
    ,public events:Events,public storage:Storage,private ionicApp:IonicApp,private app:App,public modalCtrl:ModalController,public alertCtrl:AlertController) {
 
      platform.registerBackButtonAction(()=>{
        let navView=app.getActiveNav();
        let activePortal = ionicApp._loadingPortal.getActive()

        if (activePortal){
          activePortal.dismiss();
          return;
        }
        else if(menuCtrl.isOpen()){
          menuCtrl.close();
          return;
        }
        let view = this.nav.getActive();
        let activeVC = this.nav.getActive()
        let page = activeVC.instance;
        if(!(page instanceof TabsPage)){
          if(this.nav.canGoBack() || view && view.isOverlay){
            if(activeVC.name=='TabsPage'){

            }
            else{
              this.nav.pop();

            }
          } 

          return;
        }

        let tabs = this.app.getActiveNav();
        if(!tabs.canGoBack()){
          navView.parent.select(0)
        }
        return tabs.pop()
      },0)
     events.subscribe('loggedOut',goCat=>{
      this.userName=null
       this.app.getRootNav().setRoot('TabsPage')
     })
      events.subscribe('updateCoords',updateCoords =>{
        console.log('updated coords')
        
      })
      

      config.set("scrollPadding", false);
      config.set("scrollAssist", false);
      config.set("autoFocusAssist", true);
      config.set("android", "scrollAssist", true );
      config.set("android", "autoFocusAssist", "delay");
      events.subscribe('registered',registered=>{
        
        this.userName=userProvider.name;
      
      })

      events.subscribe("navigate",page =>{
        this.nav.push(page)
      })
      //this.userName=this.userProvider.name
      
    // enable debug mode to get console logs and stuff
    //imageLoaderConfig.enableDebugMode();
    // set a fallback url to use by default in case an image is not found
    imageLoaderConfig.setFallbackUrl('assets/imgs/user.png');

    imageLoaderConfig.setImageReturnType('base64');
    this.imageLoaderConfig.setConcurrency(5); 
    this.imageLoaderConfig.enableSpinner(false);
    //imageLoaderConfig.setSpinnerName('crescent');
    this.imageLoaderConfig.setHeight('40px')

    imageLoaderConfig.maxCacheSize = 20 * 1024 * 1024; // 2 MB
    imageLoaderConfig.maxCacheAge = 60 * 1000; // 1 minute

   
      this.rootPage="UpdatePage"
    
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      //{ title: 'التصنيفات', component: "CategoryPage" ,icon:'apps'},
      { title: 'سلة الطلبات', component: "CartPage",icon:'cart'},
      { title: 'الطلبات المنتظرة', component: "WaitingPage",icon:'clock'}
    ];

  }
 
  goCategory(s){
    this.nav.setRoot("CategoryPage",{'sex':s})
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      //let splash=this.modalCtrl.create(SplashPage)
      //this.statusBar.overlaysWebView(true);
      this.statusBar.backgroundColorByHexString('#ffccff')
     // splash.present();
      //this.splashScreen.hide();
    });
  }
  logout() {
    let alert = this.alertCtrl.create({
      title: 'تأكيد تسجيل الخروج',
      message: 'هل انت متأكد من انك تريد تسجيل الخروج ؟',
      cssClass:"foo",
      buttons: [
        {
          text: 'الغاء',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text : 'تسجيل  الخروج',
          role: 'cancel',
          handler: () => {
           this.userProvider.logout()
           //this.goLogin()
          }
        }
      ]
    });
    alert.present();
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
  account(){
    this.nav.push("AccountPage")
  }
  goLogin(){
    this.nav.push("LoginPage")
  }
  contact(page){
    this.nav.push("ContactPage",{'name':page})
  }
  cart(){
    this.openPage(this.pages[1])
  }
}
