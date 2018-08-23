import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[] = [];//iniciar lista vazia para sempre que buscar nova pagina com infinity scroll concatenar a lista

  page : number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,//objeto que permite receber paremetros passados na navegação
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoading();//chama a janela de loading
    this.produtoService.findByCategoria(categoria_id, this.page, 10)
      .subscribe(response => {
        this.items = this.items.concat(response['content']);//[content]-como resposta do backende e paginada pega somente content
        loader.dismiss();
        console.log(this.page);
        console.log(this.items);
    },
    error => {
      loader.dismiss();
    });
    
  }

  showDetail(produto_id : string){ //metodo para abrir pagina ProdutoDetailPage
    this.navCtrl.push('ProdutoDetailPage', {produto_id: produto_id});
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Aguarde..."//,
      //duration: 3000
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.page=0;
    this.items=[];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) { 
    this.page++;
    this.loadData();  
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }

}