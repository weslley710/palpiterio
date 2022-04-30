package com.br.palpiteiro.domain;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Evento extends PersistentEntityImpl {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(length = 50, nullable = false)
	private String nome;

	@Column(nullable = false)
	private LocalDate dataInicio;
	
	@Column(nullable = false)
	private LocalDate dataFim;
	
	@Column(length = 50, nullable = false)
	private String organizador;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "evento")
	@JsonIgnoreProperties("evento")
	private List<FaseEvento> faseEventoList;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public LocalDate getDataInicio() {
		return dataInicio;
	}

	public void setDataInicio(LocalDate dataInicio) {
		this.dataInicio = dataInicio;
	}

	public LocalDate getDataFim() {
		return dataFim;
	}

	public void setDataFim(LocalDate dataFim) {
		this.dataFim = dataFim;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public List<FaseEvento> getFaseEventoList() {
		return faseEventoList;
	}

	public void setFaseEventoList(List<FaseEvento> faseEventoList) {
		this.faseEventoList = faseEventoList;
	}

	public String getOrganizador() {
		return organizador;
	}

	public void setOrganizador(String organizador) {
		this.organizador = organizador;
	}
}