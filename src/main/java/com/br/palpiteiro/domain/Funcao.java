package com.br.palpiteiro.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Funcao extends PersistentEntityImpl {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(length = 50)
	private String nome;

	@Column(length = 200, nullable = false)
	private String descricao;
	
//	@JsonIgnore
//	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "funcaoList")
//	private List<Usuario> usuarioList;

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

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

//	public List<Usuario> getUsuarioList() {
//		return usuarioList;
//	}
//
//	public void setUsuarioList(List<Usuario> usuarioList) {
//		this.usuarioList = usuarioList;
//	}
}
