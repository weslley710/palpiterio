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

import com.br.palpiteiro.domain.Pais;
import com.br.palpiteiro.service.PaisService;

@RestController
@RequestMapping(value = "api/paises")
public class PaisResource {
	
	@Autowired
	private PaisService paisService;
	
	@GetMapping(value = "/{id}")
	public @ResponseBody Pais findById(@PathVariable Integer id) {
		
		Pais pais = paisService.findById(id);

		return pais;
	}
	
	@GetMapping
	public @ResponseBody List<Pais> findAll() {
		
		List<Pais> paisList = paisService.findAll();

		if (!paisList.isEmpty())
			paisList.sort(Comparator.comparing(Pais::getNome));

		return paisList;
	}
	
	@PostMapping
	public @ResponseBody Pais save(@RequestBody Pais pais) {

		pais = paisService.save(pais);

		return pais;
	}
	
	@DeleteMapping(value = "/{id}")
	public void delete(@PathVariable Integer id) {
		
		paisService.delete(id);
	}
	
	@PutMapping
	public @ResponseBody Pais update(@RequestBody Pais pais) {
		
		Pais novoPais = paisService.update(pais);

		return novoPais;
	}
}
