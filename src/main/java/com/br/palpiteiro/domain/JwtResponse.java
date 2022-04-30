package com.br.palpiteiro.domain;

import java.io.Serializable;

import org.springframework.security.core.userdetails.UserDetails;

public class JwtResponse implements Serializable {
	
	private static final long serialVersionUID = -8091879091924046844L;

	private final String jwttoken;
	private UserDetails user;
	
	public JwtResponse(String jwttoken, UserDetails user) {
		this.jwttoken = jwttoken;
		this.user = user;
	}

	public String getToken() {
		return this.jwttoken;
	}

	public UserDetails getUser() {
		return user;
	}

	public void setUser(UserDetails user) {
		this.user = user;
	}
}
