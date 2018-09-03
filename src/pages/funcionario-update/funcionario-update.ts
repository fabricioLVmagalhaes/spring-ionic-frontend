import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteService } from '../../services/domain/cliente.service';
import { FuncionarioDTO } from '../../models/funcionario.dto';
import { ClienteDTO } from '../../models/cliente.dto';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoService } from '../../services/domain/estado.service';

@IonicPage()
@Component({
  selector: 'page-funcionario-update',
  templateUrl: 'funcionario-update.html',
})
export class FuncionarioUpdatePage {

  funcionario : FuncionarioDTO;
  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];
  estSelected: number;
  cidSelected: number;
  tempCidId: string;
  estadoId: string;

  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              public clienteService: ClienteService,
              public cidadeService: CidadeService,
              public estadoService: EstadoService,
              public formBuilder: FormBuilder
            ) {

              this.formGroup = this.formBuilder.group({
                nome: [[Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
                email: [[Validators.required, Validators.email]],
                tipo : [[Validators.required]],
                cpfOuCnpj : [[Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
                senha : [[Validators.required]],
                logradouro : [[Validators.required]],
                numero : [[Validators.required]],
                complemento : [[]],
                bairro : [[]],
                cep : [[Validators.required]],
                telefone1 : [[Validators.required]],
                telefone2 : [[]],
                telefone3 : [[]],
                estadoId : [null, [Validators.required]],
                cidadeId : [null, [Validators.required]]      
              });
  
            }
  ionViewDidLoad() {
    let funcionario_id = this.navParams.get('funcionario_id');

    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;

        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
    error => {});
    
    
    
    this.clienteService.findById(funcionario_id)
      .subscribe(reponse => {
        this.funcionario = reponse as FuncionarioDTO;
        this.formGroup.controls.nome.setValue(this.funcionario.nome);
        this.formGroup.controls.email.setValue(this.funcionario.email);
        this.formGroup.controls.cpfOuCnpj.setValue(this.funcionario.cpfOuCnpj);
        this.formGroup.controls.logradouro.setValue(this.funcionario.endereco.logradouro);
        this.formGroup.controls.numero.setValue(this.funcionario.endereco.numero);
        this.formGroup.controls.complemento.setValue(this.funcionario.endereco.complemento);
        this.formGroup.controls.bairro.setValue(this.funcionario.endereco.bairro);
        this.formGroup.controls.cep.setValue(this.funcionario.endereco.cep);
        this.formGroup.controls.telefone1.setValue(this.funcionario.celular.numero);
        this.estSelected = parseInt(this.funcionario.endereco.cidade.estado.id);
        
        this.tempCidId = this.funcionario.endereco.cidade.id;
        this.formGroup.controls.estadoId.setValue(parseInt(this.funcionario.endereco.cidade.estado.id));
        this.updateCidades();
        this.cidSelected = parseInt(this.funcionario.endereco.cidade.id);
        
        
        
      },
    error => {});  
    //console.log('ionViewDidLoad FuncionarioUpdatePage');
    console.log(this.tempCidId);
    
    this.cidSelected = parseInt(this.tempCidId);
    console.log(this.cidSelected);
  }

  

  updateCidades() {
    this.estadoId = this.formGroup.value.estadoId;
    //console.log("------------------" + this.estadoId);
    if (this.estadoId == null ){
      this.estadoId == this.tempCidId;
    }
    //console.log("++++++++++++++++++++++++++++" + this.estadoId);
    
    this.cidadeService.findAll(this.estadoId)
      .subscribe(response => {
        this.cidades =  response;
        //this.formGroup.controls.cidadeId.setValue(null);
      })
  }

  




}
