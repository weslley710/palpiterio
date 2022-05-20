package com.br.palpiteiro.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.palpiteiro.domain.Rodada;
import com.br.palpiteiro.repository.RodadaRepository;
import com.br.palpiteiro.service.exception.ObjectNotFoundException;

@Service
public class RodadaService {
	
	@Autowired
	private RodadaRepository rodadaRepository;
	
	public Rodada findById(Integer id) {
		
		Optional<Rodada> rodada = rodadaRepository.findById(id);

		return rodada.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado! Id: " + id + ", Tipo: " + Rodada.class.getName()));
	}
	
	public List<Rodada> findAll() {
		
		List<Rodada> rodadaList = rodadaRepository.findAll();

		return rodadaList;
	}
	
	public Rodada save(Rodada rodada) {
		
		return rodadaRepository.save(rodada);
	}

	public void delete(Integer id) {

		rodadaRepository.deleteById(id);
	}

	public Rodada update(Rodada rodada) {

		return save(rodada);
	}
}