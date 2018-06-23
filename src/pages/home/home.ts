import { Component } from '@angular/core';
import { NavController, MenuController, PopoverController } from 'ionic-angular';
import { ListPage } from '../list/list';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public popoverCtrl: PopoverController) {
    this.menuCtrl.enable(true, 'login');
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(ListPage);
    popover.present({
      ev: myEvent
    });
  }

}
