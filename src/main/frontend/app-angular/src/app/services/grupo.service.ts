import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Grupo } from '../models/grupo';

@Injectable({
  providedIn: 'root'
})

export class GrupoService {

  private readonly API = 'api/grupos';

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Grupo[]> {
	return this.httpClient.get<Grupo[]>(this.API);	
  }
  
  findById(id: number): Observable<Grupo> {
	const url = `${this.API}/${id}`;
	return this.httpClient.get<Grupo>(url);	
  }
  
  save(grupo: Grupo): Observable<Grupo> {
	return this.httpClient.post<Grupo>(this.API, grupo);	
  }
  
  update(grupo: Grupo): Observable<Grupo> {
	return this.httpClient.put<Grupo>(this.API, grupo);	
  }
  
  delete(id: number): Observable<void> {
	const url = `${this.API}/${id}`;
	return this.httpClient.delete<void>(url);	
  }
}
