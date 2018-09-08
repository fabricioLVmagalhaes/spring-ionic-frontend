import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StorageService } from '../../services/storage.service';
import { FuncionarioService } from '../../services/domain/funcionario.service';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';


@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];

  pedido: PedidoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public funcionarioService: FuncionarioService,
    public cartService: CartService
  ) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email){
      this.funcionarioService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos']; //['enderecos'] -> especifica o item da resposta que queremos buscar

          let cart = this.cartService.getCart();

          this.pedido = {
            funcionario: {id: response['id']},//pega só o id do cliente 
            enderecoDeEntrega: null,
            pagamento: null,
            itens: cart.items.map(x => {return{quantidade: x.quantidade, produto: {id: x.produto.id}}})//percorre os items do carrinho retornando o obj no modelo certo
          }
        },
      error =>{
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  nextPage(item: EnderecoDTO){
    this.pedido.enderecoDeEntrega = {id: item.id};
    this.navCtrl.push('PaymentPage', {pedido: this.pedido})
  }

}