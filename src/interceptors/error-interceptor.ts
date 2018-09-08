import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service';
import { AlertController } from 'ionic-angular';
import { FieldMessage } from '../models/fieldmessage';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertCtrl: AlertController){        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //console.log("Passou no interceptor");
        return next.handle(req)
        .catch((error, caught) => {

            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            //se não for json converte
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo interceptor:");
            console.log(errorObj);

            switch(errorObj.status){

                //trata o erro de requisição
                case 400:
                this.handle400();
                break;

                //trata o erro de autenticacao
                case 401:
                this.handle401();
                break;

                //trata o erro de acesso não autorizado
                case 403:
                this.handle403();
                break;

                //trata o erro de campo invalido
                case 422:
                this.handle422(errorObj);
                break;

                default:
                this.handleDefaultError(errorObj);

            }

            return Observable.throw(errorObj);
        }) as any;
    }

    handle400(){
        let alert = this.alertCtrl.create({
            title: 'Erro 400: requisição invalida',
            message: 'requisição incorreta',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        alert.present();
    }

    handle401(){
        let alert = this.alertCtrl.create({
            title: 'Erro 401: falha de autenticação',
            message: 'email ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        alert.present();
    }

    //metodo auxiliar para limpar o localStorage caso seja detectado um usuário inválido
    handle403(){
        this.storage.setLocalUser(null);
    }

    handle422(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Erro 422: Validação',
            message: this.listErrors(errorObj.errors),//usa metodo auxiliar para transformar lista de erros enviadas pelo backend para string
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    handleDefaultError(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        alert.present();
    }

    private listErrors(messages : FieldMessage[]) : string {
        let s : string = '';
        for (var i=0; i<messages.length; i++) {
            s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
        }
        return s;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};