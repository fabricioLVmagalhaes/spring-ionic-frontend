import { Injectable } from "@angular/core";
import { PerfilDTO } from "../../models/perfil.dto";



@Injectable()
export class PerfilService{

    perfilNomes : string[] =[];
    perfilId: string[] = [];
    perfis: PerfilDTO[] = [];
    constructor() {

    }

    public getPerfilId(perfilNomes : string[]) : string[]{
        this.perfilId = [];
        this.perfilNomes = perfilNomes;        
        this.perfilNomes.forEach(element => {
            this.perfilId.push(this.getPerfil(element).id);  
        });
        return this.perfilId;
    }

    public getPerfis(perfis: string[]) : PerfilDTO[]{
        this.perfis = [];
        this.perfilNomes = perfis;
        this.perfilNomes.forEach(element => {
            this.perfis.push(this.getPerfil(element));
        });
        return this.perfis;
    }

    public getAll(): PerfilDTO[]{
        return this.getPerfis(["ADMIN", "VENDEDOR", "GER", "CORDENADOR", "EXECUTOR"])
    }

    public getPerfil(perfil: string) : PerfilDTO{
        if(perfil == "ADMIN"){
            let ADMIN = {id: "1", descricao: "Administrativo"}
            return ADMIN as PerfilDTO
        }
        else if(perfil == "CLIENTE"){
            let CLIENTE = {id: "2", descricao: "ROLE_CLIENTE"}
            return CLIENTE as PerfilDTO
        }
        else if(perfil == "VENDEDOR"){
            let VENDEDOR = {id: "3", descricao: "Vendedor"}
            return VENDEDOR as PerfilDTO
        }
        else if(perfil == "GER"){
            let GER = {id: "4", descricao: "Gerencial"}
            return GER as PerfilDTO
        }
        else if(perfil == "CORDENADOR"){
            let CORDENADOR = {id: "5", descricao: "Cordenador"}
            return CORDENADOR as PerfilDTO
        }
        else if(perfil == "EXECUTOR"){
            let EXECUTOR = {id: "6", descricao: "Execução de serviços"}
            return EXECUTOR as PerfilDTO
        }
        else {
            let COLABORADOR = {id: "7", descricao: "ROLE_COLABORADOR"}
            return COLABORADOR as PerfilDTO
        }
        
    }

    

    
}
