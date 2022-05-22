import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ResultadoConfronto } from '../models/resultado-confronto';

@Injectable({
  providedIn: 'root'
})

export class ResultadoConfrontoService {

  private readonly API = 'api/resultados-confrontos';

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<ResultadoConfronto[]> {
	return this.httpClient.get<ResultadoConfronto[]>(this.API);	
  }
  
  findById(id: number): Observable<ResultadoConfronto> {
	const url = `${this.API}/${id}`;
	return this.httpClient.get<ResultadoConfronto>(url);	
  }
  
  save(palpite: ResultadoConfronto): Observable<ResultadoConfronto> {
	return this.httpClient.post<ResultadoConfronto>(this.API, palpite);	
  }
  
  update(resultadoConfronto: ResultadoConfronto): Observable<ResultadoConfronto> {
	return this.httpClient.put<ResultadoConfronto>(this.API, resultadoConfronto);	
  }
  
  delete(id: number): Observable<void> {
	const url = `${this.API}/${id}`;
	return this.httpClient.delete<void>(url);	
  }
}
