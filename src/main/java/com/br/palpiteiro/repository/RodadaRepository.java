package com.br.palpiteiro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.br.palpiteiro.domain.Rodada;

@Repository
public interface RodadaRepository extends JpaRepository<Rodada, Integer> {
//	List<Rodada> findDistinctByDescricaoOrderByDescricao();
}
