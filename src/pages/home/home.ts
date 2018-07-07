import { Component } from '@angular/core';
import { NavController, MenuController, PopoverController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, 
    public popoverCtrl: PopoverController, private storage: Storage) {
    this.menuCtrl.enable(true, 'login');
  }

  ngOnInit(){
    this.storage.get('userAuth').then(authDataFromStorage=>{
      if(authDataFromStorage.scope === 'member'){
        document.getElementById('adminOptions').style.display = 'none';
      }else{
        document.getElementById('adminOptions').style.display = 'block';
      }
    })
    .catch(()=>{
      alert('storage error');
    });
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(ListPage);
      popover.present({
        ev: myEvent
    });
  }

}
