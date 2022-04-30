package com.br.palpiteiro.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.br.palpiteiro.domain.Usuario;
import com.br.palpiteiro.repository.UsuarioRepository;
import com.br.palpiteiro.service.exception.ObjectNotFoundException;

@Service
public class UsuarioService implements UserDetailsService {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private PasswordEncoder bcryptEncoder;
	
	@Override
	public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
		
		// buscar apenas usuarios ativos
		Usuario usuario = usuarioRepository.findByLoginAndIsAtivo(login, true); 

		return usuario;
	}

	public Usuario findByLogin(String login) {
		
		Usuario usuario = usuarioRepository.findByLoginAndIsAtivo(login, true);

		return usuario;
	}
	
	public Usuario findById(Integer id) {
		
		Optional<Usuario> usuario = usuarioRepository.findById(id);

		return usuario.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado! Id: " + id + ", Tipo: " + Usuario.class.getName()));
	}
	
	public List<Usuario> findAll() {
		
		List<Usuario> usuarioList = usuarioRepository.findAllByOrderByDataCadastroDesc();

		return usuarioList;
	}

	public Usuario save(Usuario usuario) {
		
		// Cryptografando a senha
		usuario.setSenha(bcryptEncoder.encode(usuario.getSenha()));
		usuario.setDataCadastro(LocalDateTime.now());
		usuario.setIsAtivo(true);
		
		return usuarioRepository.save(usuario);
	}

	public void delete(Integer id) {
		
		usuarioRepository.deleteById(id);
	}

	public Usuario update(Usuario usuario) {
		
		return usuarioRepository.save(usuario);
	}

//	private Set getAuthority(Usuario usuario) {
//        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
//
//        usuario.getFuncaoList().forEach(funcao -> {
//            authorities.add(new SimpleGrantedAuthority(funcao.getNome()));
//        });
//
//        return authorities;
//    }
}
