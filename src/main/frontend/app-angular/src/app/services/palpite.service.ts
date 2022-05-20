import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Palpite } from '../models/palpite';
import { Confronto } from '../models/confronto';

@Injectable({
  providedIn: 'root'
})

export class PalpiteService {

  private readonly API = 'api/palpites';

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Palpite[]> {
	return this.httpClient.get<Palpite[]>(this.API);	
  }
  
  findById(id: number): Observable<Palpite> {
	const url = `${this.API}/${id}`;
	return this.httpClient.get<Palpite>(url);	
  }
  
  save(palpite: Palpite): Observable<Palpite> {
	return this.httpClient.post<Palpite>(this.API, palpite);	
  }
  
  saveAll(confrontoList: Confronto[]): Observable<Palpite[]> {
	return this.httpClient.post<Palpite[]>(this.API, confrontoList);	
  }
  
  update(palpite: Palpite): Observable<Palpite> {
	return this.httpClient.put<Palpite>(this.API, palpite);	
  }
  
  delete(id: number): Observable<void> {
	const url = `${this.API}/${id}`;
	return this.httpClient.delete<void>(url);	
  }
}
