import { FilialDTO } from "./filial.dto";
import { EnderecoDTO } from "./endereco.dto";
import { CelularDTO } from "./celular.DTO";
import { TelefoneDTO } from "./telefone.dto";

export interface FuncionarioDTO {
    id : string;
    nome: string;
    email: string;
    cpfOuCnpj: string;
    endereco: EnderecoDTO;
    celular: CelularDTO;
    telefone: TelefoneDTO;
    perfis: string[];    
    filiais: FilialDTO[];
    primeiroAcesso: boolean;
}