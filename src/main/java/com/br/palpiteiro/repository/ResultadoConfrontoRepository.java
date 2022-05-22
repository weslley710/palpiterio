package com.br.palpiteiro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.br.palpiteiro.domain.ResultadoConfronto;

@Repository
public interface ResultadoConfrontoRepository extends JpaRepository<ResultadoConfronto, Integer> {

}
