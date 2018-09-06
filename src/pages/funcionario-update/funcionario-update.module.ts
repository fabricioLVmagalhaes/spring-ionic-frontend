import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FuncionarioUpdatePage } from './funcionario-update';
import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    FuncionarioUpdatePage
  ],
  imports: [
    IonicPageModule.forChild(FuncionarioUpdatePage),
    SelectSearchableModule
  ],
})
export class FuncionarioUpdatePageModule {}
