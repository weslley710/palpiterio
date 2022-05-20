package com.br.palpiteiro.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.br.palpiteiro.domain.Confronto;
import com.br.palpiteiro.domain.Usuario;
import com.br.palpiteiro.repository.ConfrontoRepository;
import com.br.palpiteiro.service.exception.ObjectNotFoundException;

@Service
public class ConfrontoService {
	
	@Autowired
	private ConfrontoRepository confrontoRepository;
	
	public Confronto findById(Integer id) {
		
		Optional<Confronto> confronto = confrontoRepository.findById(id);

		return confronto.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado! Id: " + id + ", Tipo: " + Confronto.class.getName()));
	}
	
	public List<Confronto> findAllWithPalpites() {
		
		Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		List<Confronto> confrontoList = confrontoRepository.findAllWithPalpitesByUser(usuarioLogado.getId());

		return confrontoList;
	}
	
	public Confronto save(Confronto confronto) {
		
		return confrontoRepository.save(confronto);
	}

	public void delete(Integer id) {

		confrontoRepository.deleteById(id);
	}

	public Confronto update(Confronto confronto) {

		return save(confronto);
	}
}