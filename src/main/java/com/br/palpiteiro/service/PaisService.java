package com.br.palpiteiro.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.palpiteiro.domain.Pais;
import com.br.palpiteiro.repository.PaisRepository;
import com.br.palpiteiro.service.exception.ObjectNotFoundException;

@Service
public class PaisService {
	
	@Autowired
	private PaisRepository paisRepository;
	
	public Pais findById(Integer id) {
		
		Optional<Pais> pais = paisRepository.findById(id);

		return pais.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado! Id: " + id + ", Tipo: " + Pais.class.getName()));
	}
	
	public List<Pais> findAll() {
		
		List<Pais> paisList = paisRepository.findAll();

		return paisList;
	}

	public Pais save(Pais pais) {

		return paisRepository.save(pais);
	}

	public void delete(Integer id) {

		paisRepository.deleteById(id);
	}

	public Pais update(Pais pais) {

		return paisRepository.save(pais);
	}
}
