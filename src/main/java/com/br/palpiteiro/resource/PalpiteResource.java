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

import com.br.palpiteiro.domain.Confronto;
import com.br.palpiteiro.domain.Palpite;
import com.br.palpiteiro.service.PalpiteService;

@RestController
@RequestMapping(value = "api/palpites")
public class PalpiteResource {
	
	@Autowired
	private PalpiteService palpiteService;
	
	@GetMapping(value = "/{id}")
	public @ResponseBody Palpite findById(@PathVariable Integer id) {
		
		Palpite palpite = palpiteService.findById(id);

		return palpite;
	}
	
	@GetMapping
	public @ResponseBody List<Palpite> findAll() {
		
		List<Palpite> palpiteList = palpiteService.findAll();
		
		return palpiteList;
	}
	
	@PostMapping
	public @ResponseBody List<Palpite> save(@RequestBody List<Confronto> confrontoList) {

		List<Palpite> palpiteList = palpiteService.saveAll(confrontoList);

		return palpiteList;
	}
	
	@DeleteMapping(value = "/{id}")
	public void delete(@PathVariable Integer id) {
		
		palpiteService.delete(id);
	}
	
	@PutMapping
	public @ResponseBody Palpite update(@RequestBody Palpite palpite) {
		
		Palpite novoPalpite = palpiteService.update(palpite);

		return novoPalpite;
	}
}
