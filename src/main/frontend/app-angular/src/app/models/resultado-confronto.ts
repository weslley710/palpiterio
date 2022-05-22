import { Confronto } from "./confronto";

export interface ResultadoConfronto {
	id?: number,
	placarCasa: number,
	placarFora: number,
	confronto: Confronto
}