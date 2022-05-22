import { Bolao } from "./bolao";
import { Usuario } from "./usuario";

export interface ParticipanteBolao {
	id?: number,
	isAtivo?: Boolean,
	bolao: Bolao,
	usuario?: Usuario
}
