package com.br.palpiteiro.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

/**
 * Classe com as configuracores do perfil de desenvolvedor
 *  
 * @author Wesley
 *
 */
@Configuration
@Profile("dev")
public class DevConfig {

	@Bean
	public boolean instancia() {
//		this.dbService.instanciaDB();
		
		return true;
	}
}
