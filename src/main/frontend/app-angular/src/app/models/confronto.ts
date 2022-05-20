import { Rodada } from "./rodada";
import { Pais } from "./pais";
import { Palpite } from "./palpite";

export interface Confronto {
	id?: number,
	dataHora: Date,
	rodada?: Rodada,
	rodadaDescricao?: String,
	adversarioCasa: Pais,
	adversarioFora: Pais,
	palpiteList?: Palpite[]
}
