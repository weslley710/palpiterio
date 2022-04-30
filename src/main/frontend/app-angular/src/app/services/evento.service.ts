import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Evento } from '../models/evento';
import { FaseEvento } from '../models/fase-evento';

@Injectable({
  providedIn: 'root'
})

export class EventoService {

  private readonly API = 'api/eventos';

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Evento[]> {
	return this.httpClient.get<Evento[]>(this.API);	
  }
  
  findById(id: number): Observable<Evento> {
	const url = `${this.API}/${id}`;
	return this.httpClient.get<Evento>(url);	
  }
  
  findFaseEventoByEvento(evento: Evento): Observable<FaseEvento[]> {
	const url = `${this.API}/find-faseEvento-by-evento`;
	return this.httpClient.post<FaseEvento[]>(url, evento);	
  }
  
  save(evento: Evento): Observable<Evento> {
	return this.httpClient.post<Evento>(this.API, evento);	
  }
  
  update(evento: Evento): Observable<Evento> {
	return this.httpClient.put<Evento>(this.API, evento);	
  }
  
  delete(id: number): Observable<void> {
	const url = `${this.API}/${id}`;
	return this.httpClient.delete<void>(url);	
  }
}
