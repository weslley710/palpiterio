import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Rodada } from '../models/rodada';

@Injectable({
  providedIn: 'root'
})

export class RodadaService {

  private readonly API = 'api/rodadas';

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Rodada[]> {
	return this.httpClient.get<Rodada[]>(this.API);	
  }
  
  findById(id: number): Observable<Rodada> {
	const url = `${this.API}/${id}`;
	return this.httpClient.get<Rodada>(url);	
  }
  
  save(rodada: Rodada): Observable<Rodada> {
	return this.httpClient.post<Rodada>(this.API, rodada);	
  }
  
  update(rodada: Rodada): Observable<Rodada> {
	return this.httpClient.put<Rodada>(this.API, rodada);	
  }
  
  delete(id: number): Observable<void> {
	const url = `${this.API}/${id}`;
	return this.httpClient.delete<void>(url);	
  }
}
