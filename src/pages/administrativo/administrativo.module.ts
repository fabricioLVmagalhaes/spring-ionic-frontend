import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdministrativoPage } from './administrativo';

@NgModule({
  declarations: [
    AdministrativoPage,
  ],
  imports: [
    IonicPageModule.forChild(AdministrativoPage),
  ],
})
export class AdministrativoPageModule {}
