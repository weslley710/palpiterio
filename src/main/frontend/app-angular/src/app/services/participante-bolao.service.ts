import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ParticipanteBolao } from '../models/participante-bolao';

@Injectable({
  providedIn: 'root'
})

export class ParticipanteBolaoService {

  private readonly API = 'api/participantes-boloes';

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<ParticipanteBolao[]> {
	return this.httpClient.get<ParticipanteBolao[]>(this.API);	
  }
  
  findById(id: number): Observable<ParticipanteBolao> {
	const url = `${this.API}/${id}`;
	return this.httpClient.get<ParticipanteBolao>(url);	
  }
  
  save(participanteBolao: ParticipanteBolao): Observable<ParticipanteBolao> {
	return this.httpClient.post<ParticipanteBolao>(this.API, participanteBolao);	
  }
  
  update(participanteBolao: ParticipanteBolao): Observable<ParticipanteBolao> {
	return this.httpClient.put<ParticipanteBolao>(this.API, participanteBolao);	
  }
  
  delete(id: number): Observable<void> {
	const url = `${this.API}/${id}`;
	return this.httpClient.delete<void>(url);	
  }
}
