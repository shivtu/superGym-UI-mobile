import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  primary_phone: number;
  password: string;
  userAuth: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController,
    private http: HTTP, private storage: Storage) {
    this.menuCtrl.enable(false, 'login');
  }

  

  show_signIn_card(){
    document.getElementById('signIn-card').style.display = 'block';
  }

  signIn(){
    this.http.post('http://localhost:3000/users/login',
    {"primary_phone":this.primary_phone, "password":this.password},
    {"Content-Type":"application/x-www-form-urlencoded", "Accept":"application/json"})
    .then(authData=>{
      this.userAuth = JSON.parse(authData.data);
      if(authData.status === 200){
        this.storage.set('userAuth', this.userAuth.token)
        .then(()=>{
          this.navCtrl.setRoot(HomePage);
        })
        .catch(()=>{
          alert('error storage');
        });
      }else{
        alert('something went wrong '+authData.status);
      }
    })
    .catch(err=>{
      alert(JSON.stringify(err));
    });
  }

}
