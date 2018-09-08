import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FuncionarioDTO } from '../../models/funcionario.dto';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-cadastro-de-funcionarios',
  templateUrl: 'cadastro-de-funcionarios.html',
})
export class CadastroDeFuncionariosPage {

  items : FuncionarioDTO[];

  

  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              public clienteService: ClienteService              
            ) {
  }

  ionViewDidLoad() {
    this.clienteService.findAll()
      .subscribe(response => {
        this.items = response;
      },
    error =>{
      if (error.status == 403) {
        this.navCtrl.setRoot('HomePage');
      }
    });
    //console.log('ionViewDidLoad CadastroDeFuncionariosPage');
  }
  showDetail(funcionario_id : string){ //metodo para abrir pagina ProdutoDetailPage
    
    this.navCtrl.push('FuncionarioUpdatePage', {funcionario_id: funcionario_id});
  }

}


