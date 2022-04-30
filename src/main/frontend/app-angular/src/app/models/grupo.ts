import { FaseEvento } from "./fase-evento";
import { Pais } from "./pais";

export interface Grupo {
	id?: number,
	nome: String,
	qtdClassificados: number,
	faseEvento: FaseEvento,
	participanteList: Pais[]
}
