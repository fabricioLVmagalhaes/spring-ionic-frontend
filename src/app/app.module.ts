import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriaService } from '../services/domain/categoria.service';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { ClienteService } from '../services/domain/cliente.service';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { ProdutoService } from '../services/domain/produto.service';
import { CartService } from '../services/domain/cart.service';
import { EstadoService } from '../services/domain/estado.service';
import { CidadeService } from '../services/domain/cidade.service';
import { SelectSearchableModule } from 'ionic-select-searchable'
import { FilialService } from '../services/domain/filial.service';
import { PerfilService } from '../services/domain/perfil.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    SelectSearchableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriaService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    ClienteService,
    ProdutoService,
    CartService,
    CidadeService,
    EstadoService,
    FilialService,
    PerfilService
  ]
})
export class AppModule {}
