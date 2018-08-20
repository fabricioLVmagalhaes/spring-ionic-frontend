import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,//objeto que permite receber paremetros passados na navegação
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {
        this.items = response['content'];//[content]-como resposta do backende e paginada pega somente content
    },
    error => {});
    
  }

  showDetail(produto_id : string){ //metodo para abrir pagina ProdutoDetailPage
    this.navCtrl.push('ProdutoDetailPage', {produto_id: produto_id});
  }

}