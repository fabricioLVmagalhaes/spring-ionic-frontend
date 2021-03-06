import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FuncionarioDTO } from '../../models/funcionario.dto';
import { FuncionarioService } from '../../services/domain/funcionario.service';

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
              public funcionarioService: FuncionarioService              
            ) {
  }

  ionViewDidLoad() {
    this.funcionarioService.findAll()
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

  createNew(){
    this.navCtrl.push('NewFuncionarioPage');
    
  }

}


