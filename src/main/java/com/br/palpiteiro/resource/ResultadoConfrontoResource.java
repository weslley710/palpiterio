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

import com.br.palpiteiro.domain.ResultadoConfronto;
import com.br.palpiteiro.service.ResultadoConfrontoService;

@RestController
@RequestMapping(value = "api/resultados-confrontos")
public class ResultadoConfrontoResource {
	
	@Autowired
	private ResultadoConfrontoService resultadoConfrontoService;
	
	@GetMapping(value = "/{id}")
	public @ResponseBody ResultadoConfronto findById(@PathVariable Integer id) {
		
		ResultadoConfronto resultadoConfronto = resultadoConfrontoService.findById(id);

		return resultadoConfronto;
	}
	
	@GetMapping
	public @ResponseBody List<ResultadoConfronto> findAll() {
		
		List<ResultadoConfronto> resultadoConfrontoList = resultadoConfrontoService.findAll();

		return resultadoConfrontoList;
	}
	
	@PostMapping
	public @ResponseBody ResultadoConfronto save(@RequestBody ResultadoConfronto resultadoConfronto) {

		resultadoConfronto = resultadoConfrontoService.save(resultadoConfronto);

		return resultadoConfronto;
	}
	
	@DeleteMapping(value = "/{id}")
	public void delete(@PathVariable Integer id) {
		
		resultadoConfrontoService.delete(id);
	}
	
	@PutMapping
	public @ResponseBody ResultadoConfronto update(@RequestBody ResultadoConfronto resultadoConfronto) {
		
		ResultadoConfronto novoResultadoConfronto = resultadoConfrontoService.update(resultadoConfronto);

		return novoResultadoConfronto;
	}
}
