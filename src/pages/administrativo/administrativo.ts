import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-administrativo',
  templateUrl: 'administrativo.html',
})
export class AdministrativoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AdministrativoPage');
  }

  goToCadastros(){
    this.navCtrl.push('CadastrosPage');
  }

}
