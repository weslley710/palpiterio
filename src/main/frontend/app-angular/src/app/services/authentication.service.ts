import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from '../services/usuario.service';

import { environment } from 'src/environments/environment';

export class User {
  constructor(public status: string) {}
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private readonly API = environment.baseUrl;

  constructor(private httpClient: HttpClient, private usuarioService: UsuarioService) {}
  // Provide username and password for authentication, and once authentication is successful, 
  //store JWT token in session
  authenticate(login, senha) {
    return this.httpClient
      .post<any>(this.API + "/authenticate", { login, senha })
      .pipe(
        map(userLogged => {
          sessionStorage.setItem("login", login);
          let tokenStr = "Bearer " + userLogged.token;
          sessionStorage.setItem("token", tokenStr);
          
          // Seta usuario logado na sessao
          sessionStorage.setItem("usuarioLogado", JSON.stringify(userLogged));

          return userLogged;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("login");
    console.log(!(user === null));
    
    return !(user === null);
  }
  
  userLogged(): Usuario {
	var usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
	return usuarioLogado;
  }

  logOut() {
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("usuarioLogado");
  }
  
  roleMatch(allowedRoles): boolean {
    let isMatch = false;
	
	const userRoles: any = this.userLogged().funcaoList;
	
    if (userRoles != null && userRoles) {
    	for (let i = 0; i < userRoles.length; i++) {
        	for (let j = 0; j < allowedRoles.length; j++) {
          		if (userRoles[i].nome === allowedRoles[j]) {
            		isMatch = true;
            		
            		return isMatch;
          		} else {
            		return isMatch;
          		}
        	}
      	}
    } 

    return isMatch;
  }
}