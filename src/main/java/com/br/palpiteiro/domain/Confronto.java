package com.br.palpiteiro.domain;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedAttributeNode;
import javax.persistence.NamedEntityGraph;
import javax.persistence.NamedSubgraph;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
//@NamedEntityGraph(name = "graph.Confronto.palpiteList", attributeNodes = @NamedAttributeNode("palpiteList"))
@NamedEntityGraph(name="graph.Confronto", attributeNodes={
	    @NamedAttributeNode("palpiteList"),
	    @NamedAttributeNode("adversarioCasa"),
	    @NamedAttributeNode("adversarioFora"),
	    @NamedAttributeNode("resultadoConfronto"),
	    @NamedAttributeNode(value = "rodada", subgraph = "grupo")
	},
		subgraphs = {
		  @NamedSubgraph(
	         name = "grupo",
	         attributeNodes = {
	           @NamedAttributeNode("grupo")
	         }
		  )
	    }
    )
public class Confronto extends PersistentEntityImpl {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(nullable = false)
	private LocalDateTime dataHora;
	
	@ManyToOne
	@JoinColumn(name="rodada_id", nullable = false)
	@JsonIgnoreProperties("confrontoList")
	private Rodada rodada;
	
	@ManyToOne
	@JoinColumn(name="adversario_casa_id", nullable = false)
	private Pais adversarioCasa;
	
	@ManyToOne
	@JoinColumn(name="adversario_fora_id", nullable = false)
	private Pais adversarioFora;
	
	@OneToMany(cascade = CascadeType.REMOVE, mappedBy = "confronto")
	@NotFound(action=NotFoundAction.IGNORE)
	@JsonIgnoreProperties("confronto")
	private List<Palpite> palpiteList;
	
	@OneToOne(mappedBy = "confronto")
	@JsonIgnoreProperties("confronto")
	private ResultadoConfronto resultadoConfronto;

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

	public Rodada getRodada() {
		return rodada;
	}

	public void setRodada(Rodada rodada) {
		this.rodada = rodada;
	}

	public Pais getAdversarioCasa() {
		return adversarioCasa;
	}

	public void setAdversarioCasa(Pais adversarioCasa) {
		this.adversarioCasa = adversarioCasa;
	}

	public Pais getAdversarioFora() {
		return adversarioFora;
	}

	public void setAdversarioFora(Pais adversarioFora) {
		this.adversarioFora = adversarioFora;
	}

	public List<Palpite> getPalpiteList() {
		return palpiteList;
	}

	public void setPalpiteList(List<Palpite> palpiteList) {
		this.palpiteList = palpiteList;
	}

	public ResultadoConfronto getResultadoConfronto() {
		return resultadoConfronto;
	}

	public void setResultadoConfronto(ResultadoConfronto resultadoConfronto) {
		this.resultadoConfronto = resultadoConfronto;
	}
}