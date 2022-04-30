import { FaseEvento } from "./fase-evento";

export interface Evento {
	id?: number,
	nome: String,
	organizador: String,
	dataInicio: Date,
	dataFim: Date,
	faseEventoList: FaseEvento[]
}
