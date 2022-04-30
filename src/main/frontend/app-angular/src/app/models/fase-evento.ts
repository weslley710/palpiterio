import { Evento } from "./evento";

export interface FaseEvento {
	id?: number,
	descricao: String,
	dataInicio: Date,
	dataFim: Date,
	evento?: Evento
}
