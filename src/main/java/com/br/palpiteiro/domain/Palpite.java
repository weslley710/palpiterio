package com.br.palpiteiro.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Palpite extends PersistentEntityImpl {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false)
	private LocalDateTime dataHora;

	@Column(nullable = false)
	private Integer placarCasa;

	@Column(nullable = false)
	private Integer placarFora;

	@ManyToOne
	@JoinColumn(name="usuario_id", nullable = false)
	private Usuario usuario;

	@ManyToOne
	@JoinColumn(name="confronto_id", nullable = false)
	@JsonIgnoreProperties("palpiteList")
	private Confronto confronto;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public LocalDateTime getDataHora() {
		return dataHora;
	}

	public void setDataHora(LocalDateTime dataHora) {
		this.dataHora = dataHora;
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

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Confronto getConfronto() {
		return confronto;
	}

	public void setConfronto(Confronto confronto) {
		this.confronto = confronto;
	}
}