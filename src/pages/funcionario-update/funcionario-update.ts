import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FuncionarioService } from '../../services/domain/funcionario.service';
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
  selector: 'page-funcionario-update',
  templateUrl: 'funcionario-update.html',
})
export class FuncionarioUpdatePage {

  @ViewChild('mySelect') selectComponent: SelectSearchableComponent;

  funcionario_id: string = null;

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
              public funcionarioService: FuncionarioService,
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
    this.funcionario_id = this.navParams.get('funcionario_id');

    if (this.funcionario!=null && this.funcionario_id!="" && this.funcionario_id!=undefined){
      
      Observable.forkJoin([ 
        this.funcionarioService.findById(this.funcionario_id),
        this.cidadeService.findAll(),
        this.filialService.findAll()     
    ]).subscribe(
        results => {
          this.funcionario = results[0] as FuncionarioDTO;          
          this.cidadeSelected = this.funcionario.endereco.cidade;        
          this.cidades = results[1] as CidadeDTO[];
          this.filiais = results[2] as FilialDTO[];
          this.perfis = this.perfilService.getAll();
          this.loadFormData();
        },
        error =>{
          if (error.status == 400) {
            this.navCtrl.setRoot('AdministrativoPage');
          }
        });
  
    }
    else{
      this.navCtrl.setRoot('AdministrativoPage');
    }
    
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
    this.formGroup.controls.telefone.setValue(this.funcionario.telefone.numero);
    this.formGroup.controls.cidade.setValue(this.cidadeSelected);
    if (this.cidadeSelected != null){      
    this.formGroup.controls.estadoId.setValue(this.cidadeSelected.estado.id);
    }
    this.formGroup.controls.perfis.setValue(this.perfilService.getPerfilId(this.funcionario.perfis));
    this.formGroup.controls.filiais.setValue(this.funcionario.filiais as FilialDTO[]);
  }

  updateFuncionario(){
    this.funcionarioService.update(this.formGroup.value, this.funcionario.id)
      .subscribe(response => {
        this.showInsertOk();
      },
    error => {});

  }
  
  showInsertOk(){
    
    let toast = this.toastCtrl.create({
      message: 'Cadastro Atualizado com sucesso!',
      duration: 3000
    });
    toast.present();
    this.navCtrl.pop();
    
  }
}

