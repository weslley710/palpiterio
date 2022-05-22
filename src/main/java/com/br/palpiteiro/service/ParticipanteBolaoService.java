package com.br.palpiteiro.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.br.palpiteiro.domain.ParticipanteBolao;
import com.br.palpiteiro.domain.Usuario;
import com.br.palpiteiro.repository.ParticipanteBolaoRepository;
import com.br.palpiteiro.service.exception.ObjectNotFoundException;

@Service
public class ParticipanteBolaoService {
	
	@Autowired
	private ParticipanteBolaoRepository participanteBolaoRepository;
	
	public ParticipanteBolao findById(Integer id) {
		
		Optional<ParticipanteBolao> bolao = participanteBolaoRepository.findById(id);

		return bolao.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado! Id: " + id + ", Tipo: " + ParticipanteBolao.class.getName()));
	}
	
	public List<ParticipanteBolao> findAll() {
		
		List<ParticipanteBolao> participanteBolaoList = participanteBolaoRepository.findAll();

		return participanteBolaoList;
	}

	public ParticipanteBolao save(ParticipanteBolao participanteBolao) {

		Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		participanteBolao.setUsuario(usuarioLogado);
		
		return participanteBolaoRepository.save(participanteBolao);
	}

	public void delete(Integer id) {

		participanteBolaoRepository.deleteById(id);
	}

	public ParticipanteBolao update(ParticipanteBolao participanteBolao) {

		return participanteBolaoRepository.save(participanteBolao);
	}
}
