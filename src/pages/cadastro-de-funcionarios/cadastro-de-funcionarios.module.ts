import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroDeFuncionariosPage } from './cadastro-de-funcionarios';

@NgModule({
  declarations: [
    CadastroDeFuncionariosPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroDeFuncionariosPage),
  ],
})
export class CadastroDeFuncionariosPageModule {}
