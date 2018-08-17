import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

//decorator para indicar que esta classe e uma pagina, e assim ser referenciado como string no app.components.ts
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  //metodo para desabilitar menu ao entrar na pagina home
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  //metodo para habilitar menu ao sair da pagina inicial
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  login(){
    this.navCtrl.setRoot("CategoriasPage");
  }

}
