import { Evento } from "./evento";
import { Usuario } from "./usuario";

export interface Bolao {
	id?: number,
	nome: String,
	dataInicio: Date,
	evento: Evento,
	usuario?: Usuario
}
