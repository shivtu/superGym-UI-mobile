import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
    private http: HTTP, private storage: Storage, public loadingCtrl: LoadingController) {
    this.menuCtrl.enable(false, 'login');
  }

  

  show_signIn_card(){
    document.getElementById('signUp-card').style.display = 'none';
    document.getElementById('signIn-card').style.display = 'block';
  }

  show_signUp_card(){
    document.getElementById('signIn-card').style.display = 'none';
    document.getElementById('signUp-card').style.display = 'block';
  }

  signIn(){
  // show spinner while login
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading Please Wait...'
    });
    loading.present();

    // API call to get auth token
    this.http.post('http://192.168.0.4:3000/users/login',
    {"primary_phone":this.primary_phone, "password":this.password},
    {"Content-Type":"application/x-www-form-urlencoded", "Accept":"application/json"})
    .then(authData=>{
      this.userAuth = JSON.parse(authData.data);
      if(authData.status === 200){
        this.storage.set('userAuth', this.userAuth)
        .then(()=>{
          loading.dismiss();
          this.navCtrl.setRoot(HomePage);
        })
        .catch(()=>{
          loading.dismiss();
          alert('error storage');
        });
      }else{
        alert('something went wrong '+authData.status);
      }
    })
    .catch(err=>{
      loading.dismiss();
      alert(JSON.stringify(err));
    });
  }



}
