package com.br.palpiteiro.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.palpiteiro.domain.Evento;
import com.br.palpiteiro.domain.FaseEvento;
import com.br.palpiteiro.repository.EventoRepository;
import com.br.palpiteiro.repository.FaseEventoRepository;
import com.br.palpiteiro.service.exception.ObjectNotFoundException;

@Service
public class EventoService {
	
	@Autowired
	private EventoRepository eventoRepository;
	
	@Autowired
	private FaseEventoRepository faseEventoRepository;
	
	public Evento findById(Integer id) {
		
		Optional<Evento> evento = eventoRepository.findById(id);

		return evento.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado! Id: " + id + ", Tipo: " + Evento.class.getName()));
	}
	
	public List<Evento> findAll() {
		
		List<Evento> eventoList = eventoRepository.findAll();

		return eventoList;
	}
	
	public List<FaseEvento> findFaseEventoByEvento(Evento evento) {
		
		List<FaseEvento> faseEventoList = faseEventoRepository.findAllByEvento(evento);

		return faseEventoList;
	}

	public Evento save(Evento evento) {
		
		for (FaseEvento faseEvento : evento.getFaseEventoList()) {
			faseEvento.setEvento(evento);
		}

		return eventoRepository.save(evento);
	}

	public void delete(Integer id) {

		eventoRepository.deleteById(id);
	}

	public Evento update(Evento evento) {

		return eventoRepository.save(evento);
	}
}
