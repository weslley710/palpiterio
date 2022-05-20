import { Grupo } from "./grupo";
import { Confronto } from "./confronto";

export interface Rodada {
	id?: number,
	descricao: String,
	grupo?: Grupo,
	confrontoList: Confronto[]
}
