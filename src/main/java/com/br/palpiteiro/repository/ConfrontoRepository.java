package com.br.palpiteiro.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.br.palpiteiro.domain.Confronto;

@Repository
public interface ConfrontoRepository extends JpaRepository<Confronto, Integer> {
	
//	@Query(value = "SELECT * from confronto left join palpite pal ON pal.confronto_id = confronto.id and pal.usuario_id = ?1", nativeQuery = true)
	@Query(value = "SELECT con from Confronto con left join con.palpiteList pal on pal.usuario.id = :usuarioId")
	@EntityGraph(value = "graph.Confronto")
	List<Confronto> findAllWithPalpitesByUser(Integer usuarioId);
}
