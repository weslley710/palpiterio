import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Pais } from '../models/pais';

@Injectable({
  providedIn: 'root'
})

export class PaisService {

  private readonly API = 'api/paises';

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Pais[]> {
	return this.httpClient.get<Pais[]>(this.API);	
  }
  
  findById(id: number): Observable<Pais> {
	const url = `${this.API}/${id}`;
	return this.httpClient.get<Pais>(url);	
  }
  
  save(pais: Pais): Observable<Pais> {
	return this.httpClient.post<Pais>(this.API, pais);	
  }
  
  update(pais: Pais): Observable<Pais> {
	return this.httpClient.put<Pais>(this.API, pais);	
  }
  
  delete(id: number): Observable<void> {
	const url = `${this.API}/${id}`;
	return this.httpClient.delete<void>(url);	
  }
}
