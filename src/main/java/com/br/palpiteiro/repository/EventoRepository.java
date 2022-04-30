package com.br.palpiteiro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.br.palpiteiro.domain.Evento;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Integer> {

}
