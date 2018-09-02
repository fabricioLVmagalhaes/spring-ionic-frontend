import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';
import { emailDTO } from '../../models/email.dto';

//decorator para indicar que esta classe e uma pagina, e assim ser referenciado como string no app.components.ts
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO ={
    email: "",
    senha: ""
  };

  email : emailDTO = {
    email: ""
  }

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService,
    public alertCtrl: AlertController
  ) {

  }

  //metodo para desabilitar menu ao entrar na pagina home
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  //metodo para habilitar menu ao sair da pagina inicial
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter(){
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get(`Authorization`));//passa o token para ser armazenado
        this.navCtrl.setRoot("ProfilePage");
      },
    error => {});
  }

  login(){
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get(`Authorization`));//passa o token para ser armazenado
        this.navCtrl.setRoot("ProfilePage");
      },
    error => {});    
    
  }

  forgot(){
    this.auth.forgot(this.email)
    .subscribe(responser => {
      this.showResetOk();
      this.navCtrl.setRoot("HomePage");
    },
    error => {}
    );
  }

  sigup(){
    this.navCtrl.push('SignupPage')
  }

  showResetOk(){
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Senha provisória enviada ao email de cadastro',
      enableBackdropDismiss: false, //obriga o usuário a prescionar o botão do alert para sair da menssagem
      buttons: [
        {
          text: 'OK',
          handler: () => {
           // this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

}
