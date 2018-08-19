import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService {

    constructor(public http: HttpClient, public storage : StorageService){

    }

    authenticate(creds : CredenciaisDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            creds,//dados enviado no post
        {
            observe: `response`,//pegar resposta no header
            responseType: `text`//como o corpo da resposta e vazio, não tentar fazer o parse do json
        });
    }

    successfulLogin(authorizationValue : string){
        let tok = authorizationValue.substring(7);//remove o bearer do token
        let user : LocalUser = {
            token : tok
        };
        this.storage.setLocalUser(user);
    }

    logout(){
        this.storage.setLocalUser(null);
    }

}