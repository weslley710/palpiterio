package com.br.palpiteiro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.br.palpiteiro.domain.Bolao;

@Repository
public interface BolaoRepository extends JpaRepository<Bolao, Integer> {

}
