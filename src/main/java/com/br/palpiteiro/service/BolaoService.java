package com.br.palpiteiro.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.palpiteiro.domain.Bolao;
import com.br.palpiteiro.repository.BolaoRepository;
import com.br.palpiteiro.service.exception.ObjectNotFoundException;

@Service
public class BolaoService {
	
	@Autowired
	private BolaoRepository bolaoRepository;
	
	public Bolao findById(Integer id) {
		
		Optional<Bolao> bolao = bolaoRepository.findById(id);

		return bolao.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado! Id: " + id + ", Tipo: " + Bolao.class.getName()));
	}
	
	public List<Bolao> findAll() {
		
		List<Bolao> bolaoList = bolaoRepository.findAll();

		return bolaoList;
	}

	public Bolao save(Bolao bolao) {

		return bolaoRepository.save(bolao);
	}

	public void delete(Integer id) {

		bolaoRepository.deleteById(id);
	}

	public Bolao update(Bolao bolao) {

		return bolaoRepository.save(bolao);
	}
}
