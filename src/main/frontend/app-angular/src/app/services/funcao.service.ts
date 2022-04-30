import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Funcao } from '../models/funcao';

@Injectable({
  providedIn: 'root'
})

export class FuncaoService {

  private readonly API = 'api/funcoes';

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Funcao[]> {
	return this.httpClient.get<Funcao[]>(this.API);	
  }
  
  findById(id: number): Observable<Funcao> {
	const url = `${this.API}/${id}`;
	return this.httpClient.get<Funcao>(url);	
  }
  
  save(funcao: Funcao): Observable<Funcao> {
	return this.httpClient.post<Funcao>(this.API, funcao);	
  }
  
  update(funcao: Funcao): Observable<Funcao> {
	return this.httpClient.put<Funcao>(this.API, funcao);	
  }
  
  delete(id: number): Observable<void> {
	const url = `${this.API}/${id}`;
	return this.httpClient.delete<void>(url);	
  }
}
