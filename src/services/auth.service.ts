import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthService {

    constructor(public http: HttpClient){

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

}