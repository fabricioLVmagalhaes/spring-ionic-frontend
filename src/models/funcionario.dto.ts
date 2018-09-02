import { FilialDTO } from "./filial.dto";

export interface FuncionarioDTO {
    id : string;
    nome: string;
    filiais: FilialDTO[];
    cpfOuCnpj: string;
}