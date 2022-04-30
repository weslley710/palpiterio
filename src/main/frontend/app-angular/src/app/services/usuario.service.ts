import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private readonly API = 'api/usuarios';

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Usuario[]> {
	return this.httpClient.get<Usuario[]>(this.API);	
  }
  
  findById(id: number): Observable<Usuario> {
	const url = `${this.API}/${id}`;
	return this.httpClient.get<Usuario>(url);	
  }
  
  findByLogin(login: string): Observable<Usuario> {
	const url = `${this.API}/find-by-login?login=${login}`;
	return this.httpClient.get<Usuario>(url);
  }
  
  save(usuario: Usuario): Observable<Usuario> {
	return this.httpClient.post<Usuario>(this.API, usuario);	
  }
  
  update(usuario: Usuario): Observable<Usuario> {
	return this.httpClient.put<Usuario>(this.API, usuario);	
  }
  
  delete(id: number): Observable<void> {
	const url = `${this.API}/${id}`;
	return this.httpClient.delete<void>(url);	
  }
}
