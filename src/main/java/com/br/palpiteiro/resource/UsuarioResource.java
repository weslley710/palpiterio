package com.br.palpiteiro.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.br.palpiteiro.domain.Usuario;
import com.br.palpiteiro.service.UsuarioService;

@RestController
@RequestMapping(value = "api/usuarios")
public class UsuarioResource {
	
	@Autowired
	private UsuarioService usuarioService;
	
	@GetMapping(value = "/{id}")
	public @ResponseBody Usuario findById(@PathVariable Integer id) {
		
		Usuario usuario = usuarioService.findById(id);

		return usuario;
	}
	
	@GetMapping(value = "/find-by-login")
	public @ResponseBody Usuario findByLogin(@RequestParam String login) {
		
		Usuario usuario = usuarioService.findByLogin(login);

		return usuario;
	}
	
	@GetMapping
	public @ResponseBody List<Usuario> findAll() {
		
		List<Usuario> usuarioList = usuarioService.findAll();
		
		return usuarioList;
	}
	
	@PostMapping
	public @ResponseBody Usuario save(@RequestBody Usuario usuario) {

		usuario = usuarioService.save(usuario);

		return usuario;
	}
	
	@DeleteMapping(value = "/{id}")
	public void delete(@PathVariable Integer id) {
		
		usuarioService.delete(id);
	}
	
	@PutMapping
	public @ResponseBody Usuario update(@RequestBody Usuario usuario) {
		
		Usuario novoUsuario = usuarioService.update(usuario);

		return novoUsuario;
	}
}
