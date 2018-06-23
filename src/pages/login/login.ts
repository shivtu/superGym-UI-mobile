import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
    this.menuCtrl.enable(false, 'login');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signIn(){
    this.navCtrl.setRoot(HomePage);
  }

}
