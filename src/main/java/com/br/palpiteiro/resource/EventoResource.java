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

import com.br.palpiteiro.domain.Evento;
import com.br.palpiteiro.domain.FaseEvento;
import com.br.palpiteiro.service.EventoService;

@RestController
@RequestMapping(value = "api/eventos")
public class EventoResource {
	
	@Autowired
	private EventoService eventoService;
	
	@GetMapping(value = "/{id}")
	public @ResponseBody Evento findById(@PathVariable Integer id) {
		
		Evento evento = eventoService.findById(id);

		return evento;
	}
	
	@GetMapping
	public @ResponseBody List<Evento> findAll() {
		
		List<Evento> eventoList = eventoService.findAll();
		
		return eventoList;
	}
	
	@PostMapping(value = "/find-faseEvento-by-evento")
	public @ResponseBody List<FaseEvento> findFaseEventoByEvento(@RequestBody Evento evento) {

		List<FaseEvento> faseEventoList = eventoService.findFaseEventoByEvento(evento);

		return faseEventoList;
	}
	
	@PostMapping
	public @ResponseBody Evento save(@RequestBody Evento evento) {

		evento = eventoService.save(evento);

		return evento;
	}
	
	@DeleteMapping(value = "/{id}")
	public void delete(@PathVariable Integer id) {
		
		eventoService.delete(id);
	}
	
	@PutMapping
	public @ResponseBody Evento update(@RequestBody Evento evento) {
		
		Evento novoEvento = eventoService.update(evento);

		return novoEvento;
	}
}
