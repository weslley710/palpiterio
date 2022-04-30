package com.br.palpiteiro.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.palpiteiro.domain.Grupo;
import com.br.palpiteiro.repository.GrupoRepository;
import com.br.palpiteiro.service.exception.ObjectNotFoundException;

@Service
public class GrupoService {
	
	@Autowired
	private GrupoRepository grupoRepository;
	
	public Grupo findById(Integer id) {
		
		Optional<Grupo> grupo = grupoRepository.findById(id);

		return grupo.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado! Id: " + id + ", Tipo: " + Grupo.class.getName()));
	}
	
	public List<Grupo> findAll() {
		
		List<Grupo> grupoList = grupoRepository.findAll();

		return grupoList;
	}

	public Grupo save(Grupo grupo) {
		
//		for (FaseGrupo faseGrupo : grupo.getFaseGrupoList()) {
//			faseGrupo.setGrupo(grupo);
//		}

		return grupoRepository.save(grupo);
	}

	public void delete(Integer id) {

		grupoRepository.deleteById(id);
	}

	public Grupo update(Grupo grupo) {

		return grupoRepository.save(grupo);
	}
}