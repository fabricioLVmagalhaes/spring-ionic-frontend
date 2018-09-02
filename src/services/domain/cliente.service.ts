import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { FuncionarioDTO } from "../../models/funcionario.dto";

@Injectable()
export class ClienteService{

    constructor(public http: HttpClient, public storage: StorageService){
    }

    findById(id: string) {

        return this.http.get(`${API_CONFIG.baseUrl}/funcionarios/${id}`);
    }

    findByEmail(email: string) {

        return this.http.get(`${API_CONFIG.baseUrl}/funcionarios/email?value=${email}`);
    }

    findAll() : Observable<FuncionarioDTO[]>{
        return this.http.get<FuncionarioDTO[]>(`${API_CONFIG.baseUrl}/funcionarios`);
    }

    insert(obj : ClienteDTO) {
            return this.http.post(
            `${API_CONFIG.baseUrl}/funcionarios`,
            obj,
            {
                observe: 'response',
                responseType: 'text'// tipo texto pois o retorno vem com o corpo vazio e poderia dar um erro de parse json
            }
        );
    }

}