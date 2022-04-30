package com.br.palpiteiro.domain;

import java.io.Serializable;

public interface PersistentEntity<T extends Serializable> {
	
	public Integer getId();
}
