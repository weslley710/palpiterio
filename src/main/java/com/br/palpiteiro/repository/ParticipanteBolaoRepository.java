package com.br.palpiteiro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.br.palpiteiro.domain.ParticipanteBolao;

@Repository
public interface ParticipanteBolaoRepository extends JpaRepository<ParticipanteBolao, Integer> {

}
