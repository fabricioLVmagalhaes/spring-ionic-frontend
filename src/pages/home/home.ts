import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

//decorator para indicar que esta classe e uma pagina, e assim ser referenciado como string no app.components.ts
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  login(){
    this.navCtrl.setRoot("CategoriasPage");
  }

}
