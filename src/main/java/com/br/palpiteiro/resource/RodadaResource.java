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

import com.br.palpiteiro.domain.Rodada;
import com.br.palpiteiro.service.RodadaService;

@RestController
@RequestMapping(value = "api/rodadas")
public class RodadaResource {
	
	@Autowired
	private RodadaService rodadaService;
	
	@GetMapping(value = "/{id}")
	public @ResponseBody Rodada findById(@PathVariable Integer id) {
		
		Rodada rodada = rodadaService.findById(id);

		return rodada;
	}
	
	@GetMapping
	public @ResponseBody List<Rodada> findAll() {
		
		List<Rodada> rodadaList = rodadaService.findAll();
		
		return rodadaList;
	}
	
	@PostMapping
	public @ResponseBody Rodada save(@RequestBody Rodada rodada) {

		rodada = rodadaService.save(rodada);

		return rodada;
	}
	
	@DeleteMapping(value = "/{id}")
	public void delete(@PathVariable Integer id) {
		
		rodadaService.delete(id);
	}
	
	@PutMapping
	public @ResponseBody Rodada update(@RequestBody Rodada rodada) {
		
		Rodada novoRodada = rodadaService.update(rodada);

		return novoRodada;
	}
}
