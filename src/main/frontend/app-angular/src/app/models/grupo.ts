import { FaseEvento } from "./fase-evento";
import { Pais } from "./pais";
import { Rodada } from "./rodada";

export interface Grupo {
	id?: number,
	nome: String,
	qtdClassificados: number,
	faseEvento: FaseEvento,
	participanteList: Pais[],
	rodadaList: Rodada[]
}
