package com.br.palpiteiro.resource;

import java.util.Comparator;
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

import com.br.palpiteiro.domain.Bolao;
import com.br.palpiteiro.service.BolaoService;

@RestController
@RequestMapping(value = "api/boloes")
public class BolaoResource {
	
	@Autowired
	private BolaoService bolaoService;
	
	@GetMapping(value = "/{id}")
	public @ResponseBody Bolao findById(@PathVariable Integer id) {
		
		Bolao bolao = bolaoService.findById(id);

		return bolao;
	}
	
	@GetMapping
	public @ResponseBody List<Bolao> findAll() {
		
		List<Bolao> bolaoList = bolaoService.findAll();

		if (!bolaoList.isEmpty())
			bolaoList.sort(Comparator.comparing(Bolao::getNome));

		return bolaoList;
	}
	
	@PostMapping
	public @ResponseBody Bolao save(@RequestBody Bolao bolao) {

		bolao = bolaoService.save(bolao);

		return bolao;
	}
	
	@DeleteMapping(value = "/{id}")
	public void delete(@PathVariable Integer id) {
		
		bolaoService.delete(id);
	}
	
	@PutMapping
	public @ResponseBody Bolao update(@RequestBody Bolao bolao) {
		
		Bolao novoBolao = bolaoService.update(bolao);

		return novoBolao;
	}
}
