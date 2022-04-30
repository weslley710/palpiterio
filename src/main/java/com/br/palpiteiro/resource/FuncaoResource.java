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

import com.br.palpiteiro.domain.Funcao;
import com.br.palpiteiro.service.FuncaoService;

@RestController
@RequestMapping(value = "api/funcoes")
public class FuncaoResource {
	
	@Autowired
	private FuncaoService funcaoService;
	
	@GetMapping(value = "/{id}")
	public @ResponseBody Funcao findById(@PathVariable Integer id) {
		
		Funcao funcao = funcaoService.findById(id);

		return funcao;
	}
	
	@GetMapping
	public @ResponseBody List<Funcao> findAll() {
		
		List<Funcao> funcaoList = funcaoService.findAll();
		
		return funcaoList;
	}
	
	@PostMapping
	public @ResponseBody Funcao save(@RequestBody Funcao funcao) {

		funcao = funcaoService.save(funcao);

		return funcao;
	}
	
	@DeleteMapping(value = "/{id}")
	public void delete(@PathVariable Integer id) {
		
		funcaoService.delete(id);
	}
	
	@PutMapping
	public @ResponseBody Funcao update(@RequestBody Funcao funcao) {
		
		Funcao novoFuncao = funcaoService.update(funcao);

		return novoFuncao;
	}
}
