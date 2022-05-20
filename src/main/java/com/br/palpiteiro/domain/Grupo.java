package com.br.palpiteiro.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Grupo extends PersistentEntityImpl {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(length = 10, nullable = false)
	private String nome;

	@Column(nullable = false)
	private Integer qtdClassificados;
	
	@ManyToOne
	@JoinColumn(name="fase_evento_id", nullable = false)
	private FaseEvento faseEvento;
	
	@ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(name = "grupo_pais", joinColumns = {@JoinColumn(name = "grupo_id")}, inverseJoinColumns = {@JoinColumn(name = "pais_id")})
	private List<Pais> participanteList;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "grupo")
	@JsonIgnoreProperties("grupo")
	private List<Rodada> rodadaList;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Integer getQtdClassificados() {
		return qtdClassificados;
	}

	public void setQtdClassificados(Integer qtdClassificados) {
		this.qtdClassificados = qtdClassificados;
	}

	public List<Pais> getParticipanteList() {
		return participanteList;
	}

	public void setParticipanteList(List<Pais> participanteList) {
		this.participanteList = participanteList;
	}

	public FaseEvento getFaseEvento() {
		return faseEvento;
	}

	public void setFaseEvento(FaseEvento faseEvento) {
		this.faseEvento = faseEvento;
	}

	public List<Rodada> getRodadaList() {
		return rodadaList;
	}

	public void setRodadaList(List<Rodada> rodadaList) {
		this.rodadaList = rodadaList;
	}
}