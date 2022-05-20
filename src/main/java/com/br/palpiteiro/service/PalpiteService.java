package com.br.palpiteiro.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.br.palpiteiro.domain.Confronto;
import com.br.palpiteiro.domain.Palpite;
import com.br.palpiteiro.domain.Usuario;
import com.br.palpiteiro.repository.PalpiteRepository;
import com.br.palpiteiro.service.exception.ObjectNotFoundException;

@Service
public class PalpiteService {
	
	@Autowired
	private PalpiteRepository palpiteRepository;
	
	@Autowired
	ObjectFactory<HttpSession> httpSessionFactory;
	
	public Palpite findById(Integer id) {
		
		Optional<Palpite> palpite = palpiteRepository.findById(id);

		return palpite.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado! Id: " + id + ", Tipo: " + Palpite.class.getName()));
	}
	
	public List<Palpite> findAll() {
		
		List<Palpite> palpiteList = palpiteRepository.findAll();

		return palpiteList;
	}

	public Palpite save(Palpite palpite) {

		return palpiteRepository.save(palpite);
	}
	
	public List<Palpite> saveAll(List<Confronto> confrontoList) {

		Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		List<Palpite> palpiteList = new ArrayList<Palpite>();
		
		for (Confronto confronto : confrontoList) {
			for (Palpite palpite : confronto.getPalpiteList()) {
				palpite.setConfronto(confronto);
				palpite.setDataHora(LocalDateTime.now());
				palpite.setUsuario(usuarioLogado);
			}

			palpiteList.addAll(confronto.getPalpiteList());
		}
		
		return palpiteRepository.saveAll(palpiteList);
	}

	public void delete(Integer id) {

		palpiteRepository.deleteById(id);
	}

	public Palpite update(Palpite palpite) {

		return save(palpite);
	}
}