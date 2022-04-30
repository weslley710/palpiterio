import { Funcao } from "./funcao";

export interface Usuario {
	id?: number,
	nome: String,
	email: String,
	token?: String,
	login: String,
	senha?: String,
	dataNascimento?: Date,
	dataCadastro?: Date,
	isAtivo?: Boolean,
	funcaoList: Funcao[]
}
