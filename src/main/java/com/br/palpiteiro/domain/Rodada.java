package com.br.palpiteiro.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Rodada extends PersistentEntityImpl {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(length = 20, nullable = false)
	private String descricao;

	@ManyToOne
	@JoinColumn(name="grupo_id", nullable = false)
	@JsonIgnoreProperties("rodadaList")
	private Grupo grupo;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "rodada")
	@JsonIgnoreProperties("rodada")
	private List<Confronto> confrontoList;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Grupo getGrupo() {
		return grupo;
	}

	public void setGrupo(Grupo grupo) {
		this.grupo = grupo;
	}

	public List<Confronto> getConfrontoList() {
		return confrontoList;
	}

	public void setConfrontoList(List<Confronto> confrontoList) {
		this.confrontoList = confrontoList;
	}
}