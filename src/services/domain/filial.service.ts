import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { EstadoDTO } from "../../models/estado.dto";
import { Observable } from "rxjs/Rx";
import { FilialDTO } from "../../models/filial.dto";

@Injectable()
export class FilialService{

    constructor(public http : HttpClient) {

    }

    //metodo para retornar uma lista de estados
    findAll() : Observable<FilialDTO[]> {
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/filiais`);
}
}