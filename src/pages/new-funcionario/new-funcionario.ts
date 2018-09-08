import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ClienteService } from '../../services/domain/cliente.service';
import { FuncionarioDTO } from '../../models/funcionario.dto';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { FilialDTO } from '../../models/filial.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { Observable } from 'rxjs';
import { FilialService } from '../../services/domain/filial.service';
import { PerfilDTO } from '../../models/perfil.dto';
import { PerfilService } from '../../services/domain/perfil.service';

@IonicPage()
@Component({
  selector: 'page-new-funcionario',
  templateUrl: 'new-funcionario.html',
})
export class NewFuncionarioPage {

  @ViewChild('mySelect') selectComponent: SelectSearchableComponent;

  
  perfis: PerfilDTO[] = [{
    id: "",
    descricao: ""
  }];

  filiais : FilialDTO[] = [{
    id : "",
    nome : ""
  }];

  estadoSelected : EstadoDTO={
    id: "",
    nome: ""
  }
  cidadeSelected : CidadeDTO={
    id: "",
    nome: "",
    estado: this.estadoSelected
  }
  enderecoSelected : EnderecoDTO= {
    id: "",
    logradouro : "",
    numero : "",
    complemento: "",
    bairro: "",
    cep: "",
    cidade : this.cidadeSelected
  }
  
  filialSelected : FilialDTO ={
    id : "",
    nome : ""
  };


  funcionario : FuncionarioDTO = {
    id : "",
    nome: "",
    email: "",
    cpfOuCnpj: "",
    endereco: this.enderecoSelected,
    celular: {numero: ""},
    telefone: {numero: ""},
    perfis: [],    
    filiais: this.filiais,
    primeiroAcesso: false
  };
  
  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[] = [{
    id: "",
    nome: ""
  }];

  cadastro:string;

  constructor(
    public navCtrl: NavController, 
              public navParams: NavParams,
              public clienteService: ClienteService,
              public cidadeService: CidadeService,
              public formBuilder: FormBuilder,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private filialService : FilialService,
              private perfilService : PerfilService
    ) {
      this.formGroup = this.formBuilder.group({
        nome: [null,[Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: [null,[Validators.email]],
        tipo: ["1", []],
        cpfOuCnpj : [null,[Validators.required, Validators.minLength(11), Validators.maxLength(14)]],                
        logradouro : [null,[]],
        numero : [null,[]],
        complemento : [null,[]],
        bairro : [null,[]],
        cep : [null,[]],
        celular : [null,[Validators.required, Validators.minLength(8), Validators.maxLength(14)]],
        telefone : [null,[]],                                
        estadoId : [null,[]],
        cidade : [null,[]],
        perfis : [null,[]],
        filiais : [null,[]]    
      });
  }

  ionViewWillEnter(){
    this.cadastro = "dadosPessoais";    
  }

  ionViewDidLoad() {
    

    
      
      Observable.forkJoin([ 
        
        this.cidadeService.findAll(),
        this.filialService.findAll()     
    ]).subscribe(
        results => {
                 
          this.cidadeSelected = this.funcionario.endereco.cidade;        
          this.cidades = results[0] as CidadeDTO[];
          this.filiais = results[1] as FilialDTO[];
          this.perfis = this.perfilService.getAll();
          
        },
        error =>{
          if (error.status == 400) {
            this.navCtrl.setRoot('AdministrativoPage');
          }
        });
  
    
    
    
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Aguarde...",
      duration: 3000
    });
    loader.present();
    return loader;
  }

  openFromCode() {
    this.selectComponent.open();
  }

  

  insertFuncionario(){
    this.clienteService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
      error =>{
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });

  }
  
  showInsertOk(){
    
    let toast = this.toastCtrl.create({
      message: 'Funcionário Cadastrado com Sucesso!',
      duration: 3000
    });
    toast.present();
    this.navCtrl.pop();
    
  }
}

