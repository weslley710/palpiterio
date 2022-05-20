package com.br.palpiteiro.resource;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.br.palpiteiro.configuration.JwtTokenUtil;
import com.br.palpiteiro.domain.JwtRequest;
import com.br.palpiteiro.domain.Usuario;

@RestController
@CrossOrigin
public class JwtAuthenticationResource {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private UserDetailsService jwtInMemoryUserDetailsService;

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> generateAuthenticationToken(@RequestBody JwtRequest jwtRequest) throws Exception {
		authenticate(jwtRequest.getLogin(), jwtRequest.getSenha());

		final UserDetails userDetails = jwtInMemoryUserDetailsService.loadUserByUsername(jwtRequest.getLogin());

		final String token = jwtTokenUtil.generateToken(userDetails);

		Usuario usuario = (Usuario) userDetails;
		usuario.setJwttoken(token);

		return ResponseEntity.ok(usuario);
	}

	private void authenticate(String login, String senha) throws Exception {
		Objects.requireNonNull(login);
		Objects.requireNonNull(senha);
		
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login, senha));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}
}
