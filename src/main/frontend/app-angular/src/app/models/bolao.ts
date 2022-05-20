import { Evento } from "./evento";

export interface Bolao {
	id?: number,
	nome: String,
	dataInicio: Date,
	evento: Evento
}
