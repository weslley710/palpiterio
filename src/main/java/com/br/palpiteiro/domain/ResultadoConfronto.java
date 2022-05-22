package com.br.palpiteiro.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class ResultadoConfronto extends PersistentEntityImpl {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false)
	private Integer placarCasa;

	@Column(nullable = false)
	private Integer placarFora;

	@OneToOne
	@JoinColumn(name="confronto_id", nullable = false)
	@JsonIgnoreProperties("resultadoConfronto")
	private Confronto confronto;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getPlacarCasa() {
		return placarCasa;
	}

	public void setPlacarCasa(Integer placarCasa) {
		this.placarCasa = placarCasa;
	}

	public Integer getPlacarFora() {
		return placarFora;
	}

	public void setPlacarFora(Integer placarFora) {
		this.placarFora = placarFora;
	}

	public Confronto getConfronto() {
		return confronto;
	}

	public void setConfronto(Confronto confronto) {
		this.confronto = confronto;
	}
}