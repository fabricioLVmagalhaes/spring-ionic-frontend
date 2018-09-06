import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ClienteService } from '../../services/domain/cliente.service';
import { FuncionarioDTO } from '../../models/funcionario.dto';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoService } from '../../services/domain/estado.service';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { FilialDTO } from '../../models/filial.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { Observable } from 'rxjs';
import { FilialService } from '../../services/domain/filial.service';

@IonicPage()
@Component({
  selector: 'page-funcionario-update',
  templateUrl: 'funcionario-update.html',
})
export class FuncionarioUpdatePage {

  @ViewChild('mySelect') selectComponent: SelectSearchableComponent;

  items : FilialDTO[] = [{
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
    celular: null,
    telefone: null,
    perfis: null,    
    filiais: this.items,
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
              //public estadoService: EstadoService,
              public formBuilder: FormBuilder,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private filialService : FilialService
            ) {

              this.formGroup = this.formBuilder.group({
                nome: [[Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
                email: [[Validators.email]],
                cpfOuCnpj : [[Validators.required, Validators.minLength(11), Validators.maxLength(14)]],                
                logradouro : [[]],
                numero : [[]],
                complemento : [[]],
                bairro : [[]],
                cep : [[]],
                celular : [[Validators.required]],
                telefone : [[]],
                                
                estadoId : [null, []],
                cidadeId : [null, []]      
              });
              
            }
            



  ionViewWillEnter(){
    this.cadastro = "dadosPessoais";
  }
  ionViewDidLoad() {
    
    let funcionario_id = this.navParams.get('funcionario_id');
    
    
    
    
    console.log("antes de carregar dados do funcionario");
    

    Observable.forkJoin([ 
      this.clienteService.findById(funcionario_id),
      this.cidadeService.findAll(),
      this.filialService.findAll()     
  ]).subscribe(
      results => {
        
        this.funcionario = results[0] as FuncionarioDTO;
        
        this.cidadeSelected = this.funcionario.endereco.cidade;        
        this.cidades = results[1] as CidadeDTO[];
        this.items = results[2] as FilialDTO[];
        
        this.updateCidade();
        

        
        this.loadFormData();
        
        
        
      },
      err => {
          //handle error
      }
  );




    this.clienteService.findById(funcionario_id)
      .subscribe(reponse => {
        this.funcionario = reponse as FuncionarioDTO;
                
      },
    error => {});  
    //console.log('ionViewDidLoad FuncionarioUpdatePage');
    
    
  }


  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Aguarde...",
      duration: 3000
    });
    loader.present();
    return loader;
  }

  userChanged(event: {component: SelectSearchableComponent, value: any}){
    console.log('event', event);
    
  }

  onClose(){
    let toast = this.toastCtrl.create({
      message: 'Thanks for your selection',
      duration: 200
    });
  }

  openFromCode() {
    this.selectComponent.open();
  }

  updateCidade(){
     
              
     this.cidades.forEach(element => {
       
       
       if (this.cidadeSelected.id == element.id){
         
         
         
         
         
         this.cidadeSelected == element;
         
       }
     });
     
     
     
     
  }

  

  loadFormData(){
    this.formGroup.controls.nome.setValue(this.funcionario.nome);
    this.formGroup.controls.email.setValue(this.funcionario.email);
    this.formGroup.controls.cpfOuCnpj.setValue(this.funcionario.cpfOuCnpj);        
    this.formGroup.controls.logradouro.setValue(this.funcionario.endereco.logradouro);
    this.formGroup.controls.numero.setValue(this.funcionario.endereco.numero);
    this.formGroup.controls.complemento.setValue(this.funcionario.endereco.complemento);
    this.formGroup.controls.bairro.setValue(this.funcionario.endereco.bairro);
    this.formGroup.controls.cep.setValue(this.funcionario.endereco.cep);
    this.formGroup.controls.celular.setValue(this.funcionario.celular.numero);
    this.formGroup.controls.cidadeId.setValue(this.cidadeSelected.id);
    this.formGroup.controls.estadoId.setValue(this.cidadeSelected.estado.id);
  }


}

