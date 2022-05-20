import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Bolao } from '../models/bolao';

@Injectable({
  providedIn: 'root'
})

export class BolaoService {

  private readonly API = 'api/boloes';

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Bolao[]> {
	return this.httpClient.get<Bolao[]>(this.API);	
  }
  
  findById(id: number): Observable<Bolao> {
	const url = `${this.API}/${id}`;
	return this.httpClient.get<Bolao>(url);	
  }
  
  save(bolao: Bolao): Observable<Bolao> {
	return this.httpClient.post<Bolao>(this.API, bolao);	
  }
  
  update(bolao: Bolao): Observable<Bolao> {
	return this.httpClient.put<Bolao>(this.API, bolao);	
  }
  
  delete(id: number): Observable<void> {
	const url = `${this.API}/${id}`;
	return this.httpClient.delete<void>(url);	
  }
}
