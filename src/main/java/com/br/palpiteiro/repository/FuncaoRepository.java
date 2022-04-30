package com.br.palpiteiro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.br.palpiteiro.domain.Funcao;

@Repository
public interface FuncaoRepository extends JpaRepository<Funcao, Integer> {

}
