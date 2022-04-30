package com.br.palpiteiro.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.br.palpiteiro.domain.Evento;
import com.br.palpiteiro.domain.FaseEvento;

@Repository
public interface FaseEventoRepository extends JpaRepository<FaseEvento, Integer> {
	
	List<FaseEvento> findAllByEvento(Evento evento);
}
