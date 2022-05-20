package com.br.palpiteiro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.br.palpiteiro.domain.Palpite;

@Repository
public interface PalpiteRepository extends JpaRepository<Palpite, Integer> {

}
