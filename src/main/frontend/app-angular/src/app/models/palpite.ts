import { Usuario } from "./usuario";
import { Confronto } from "./confronto";

export interface Palpite {
	id?: number,
	dataHora?: Date,
	placarCasa: number,
	placarFora: number,
	confronto: Confronto,
	usuario: Usuario
}
