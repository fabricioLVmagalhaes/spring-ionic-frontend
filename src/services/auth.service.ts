import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelper } from 'angular2-jwt' //componente adicionado com o comando "npm install --save angular2-jwt"
import { CartService } from "./domain/cart.service";
import { emailDTO } from "../models/email.dto";

@Injectable()
export class AuthService {

    jwtHelper : JwtHelper = new JwtHelper();

    constructor(public http: HttpClient,
         public storage : StorageService,
         public cartService: CartService        
        ){

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

    forgot(email : emailDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/forgot`, 
            email,//dados enviado no post
            {
                observe: `response`,
                responseType: `text`
            }
        );
        
    }

    refreshToken(){
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`, 
            {},
        {
            observe: `response`,//observar resposta no header
            responseType: `text`//como o corpo da resposta e vazio, não tentar fazer o parse do json
        });
    }

    successfulLogin(authorizationValue : string){
        let tok = authorizationValue.substring(7);//remove o bearer do token
        let user : LocalUser = {
            token : tok,
            email : this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
        this.cartService.createOrClearCart();
    }

    logout(){
        this.storage.setLocalUser(null);
    }

}