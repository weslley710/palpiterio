import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Confronto } from '../models/confronto';

@Injectable({
  providedIn: 'root'
})

export class ConfrontoService {

  private readonly API = 'api/confrontos';

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Confronto[]> {
	return this.httpClient.get<Confronto[]>(this.API);	
  }
  
  findById(id: number): Observable<Confronto> {
	const url = `${this.API}/${id}`;
	return this.httpClient.get<Confronto>(url);	
  }
  
  save(confronto: Confronto): Observable<Confronto> {
	return this.httpClient.post<Confronto>(this.API, confronto);	
  }
  
  update(confronto: Confronto): Observable<Confronto> {
	return this.httpClient.put<Confronto>(this.API, confronto);	
  }
  
  delete(id: number): Observable<void> {
	const url = `${this.API}/${id}`;
	return this.httpClient.delete<void>(url);	
  }
}
