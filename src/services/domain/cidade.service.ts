import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CidadeDTO } from "../../models/cidade.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CidadeService{

    constructor(public http : HttpClient) {

    }

    //metodo para retornar uma lista de cidades de um dado estado
    findAllByEstadoId(estado_id : string) : Observable<CidadeDTO[]> {
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`);
}
    findAllByEstado(estado_nome : string) : Observable<CidadeDTO[]> {
    return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_nome}/cidades`);
}

findAll() : Observable<CidadeDTO[]> {
    return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/cidades`);
}
}
