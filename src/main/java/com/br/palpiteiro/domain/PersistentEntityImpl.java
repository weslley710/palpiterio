package com.br.palpiteiro.domain;

import java.io.Serializable;

import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class PersistentEntityImpl implements PersistentEntity<Integer>, Serializable {
	
	private static final long serialVersionUID = 1L;

	@Override
	public boolean equals(Object obj) {
		
		if (this == obj) {
			return true;
		} else if (obj == null) {
			return false;
		} else if (this.getClass() != obj.getClass()) {
			return false;
		} else {
			@SuppressWarnings("rawtypes")
			PersistentEntity otherObj = (PersistentEntity) obj;
			
			if (this.getId() != null) {
				
				if (!getId().equals(otherObj.getId()))
					return false;
				else
					return true;
			}
		}
		
		return false;
	}
	
	@Override
	public int hashCode() {
		
		final int prime = 31;
		int result = 1;
		
		if (getId() instanceof Number) {
			
			Number number = (Number) getId();
			
			result = prime * result + number.intValue();
		} else {
			
			result = super.hashCode();
		}

		return result;
	}
}
