package com.br.palpiteiro.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.palpiteiro.domain.ResultadoConfronto;
import com.br.palpiteiro.repository.ResultadoConfrontoRepository;
import com.br.palpiteiro.service.exception.ObjectNotFoundException;

@Service
public class ResultadoConfrontoService {

	@Autowired
	private ResultadoConfrontoRepository resultadoConfrontoRepository;

	public ResultadoConfronto findById(Integer id) {

		Optional<ResultadoConfronto> palpite = resultadoConfrontoRepository.findById(id);

		return palpite.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado! Id: " + id + ", Tipo: " + ResultadoConfronto.class.getName()));
	}
	
	public List<ResultadoConfronto> findAll() {

		List<ResultadoConfronto> resultadoConfrontoList = resultadoConfrontoRepository.findAll();

		return resultadoConfrontoList;
	}

	public ResultadoConfronto save(ResultadoConfronto resultadoConfronto) {

		return resultadoConfrontoRepository.save(resultadoConfronto);
	}
	
	public void delete(Integer id) {

		resultadoConfrontoRepository.deleteById(id);
	}

	public ResultadoConfronto update(ResultadoConfronto resultadoConfronto) {

		return save(resultadoConfronto);
	}
}