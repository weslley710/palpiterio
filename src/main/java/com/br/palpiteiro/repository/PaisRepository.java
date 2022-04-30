package com.br.palpiteiro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.br.palpiteiro.domain.Pais;

@Repository
public interface PaisRepository extends JpaRepository<Pais, Integer> {

}
