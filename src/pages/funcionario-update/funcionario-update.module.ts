import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FuncionarioUpdatePage } from './funcionario-update';

@NgModule({
  declarations: [
    FuncionarioUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(FuncionarioUpdatePage),
  ],
})
export class FuncionarioUpdatePageModule {}
