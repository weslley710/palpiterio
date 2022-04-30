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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.br.palpiteiro.domain.Grupo;
import com.br.palpiteiro.service.GrupoService;

@RestController
@RequestMapping(value = "api/grupos")
public class GrupoResource {
	
	@Autowired
	private GrupoService grupoService;
	
	@GetMapping(value = "/{id}")
	public @ResponseBody Grupo findById(@PathVariable Integer id) {
		
		Grupo grupo = grupoService.findById(id);

		return grupo;
	}
	
	@GetMapping
	public @ResponseBody List<Grupo> findAll() {
		
		List<Grupo> grupoList = grupoService.findAll();
		
		return grupoList;
	}
	
	@PostMapping
	public @ResponseBody Grupo save(@RequestBody Grupo grupo) {

		grupo = grupoService.save(grupo);

		return grupo;
	}
	
	@DeleteMapping(value = "/{id}")
	public void delete(@PathVariable Integer id) {
		
		grupoService.delete(id);
	}
	
	@PutMapping
	public @ResponseBody Grupo update(@RequestBody Grupo grupo) {
		
		Grupo novoGrupo = grupoService.update(grupo);

		return novoGrupo;
	}
}
