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
import com.br.palpiteiro.service.ConfrontoService;

@RestController
@RequestMapping(value = "api/confrontos")
public class ConfrontoResource {
	
	@Autowired
	private ConfrontoService confrontoService;
	
	@GetMapping(value = "/{id}")
	public @ResponseBody Confronto findById(@PathVariable Integer id) {
		
		Confronto confronto = confrontoService.findById(id);

		return confronto;
	}
	
	@GetMapping
	public @ResponseBody List<Confronto> findAll() {
		// procura os confrontos com os palpites do usuario logado
		List<Confronto> confrontoList = confrontoService.findAllWithPalpites();
		
		return confrontoList;
	}
	
	@PostMapping
	public @ResponseBody Confronto save(@RequestBody Confronto confronto) {

		confronto = confrontoService.save(confronto);

		return confronto;
	}
	
	@DeleteMapping(value = "/{id}")
	public void delete(@PathVariable Integer id) {
		
		confrontoService.delete(id);
	}
	
	@PutMapping
	public @ResponseBody Confronto update(@RequestBody Confronto confronto) {
		
		Confronto novoConfronto = confrontoService.update(confronto);

		return novoConfronto;
	}
}
