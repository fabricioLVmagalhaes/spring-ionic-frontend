import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewFuncionarioPage } from './new-funcionario';
import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    NewFuncionarioPage,
  ],
  imports: [
    IonicPageModule.forChild(NewFuncionarioPage),
    SelectSearchableModule
  ],
})
export class NewFuncionarioPageModule {}
