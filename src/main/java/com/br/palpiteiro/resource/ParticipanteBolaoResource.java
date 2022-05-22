package com.br.palpiteiro.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.br.palpiteiro.domain.ParticipanteBolao;
import com.br.palpiteiro.service.ParticipanteBolaoService;

@RestController
@RequestMapping(value = "api/participantes-boloes")
public class ParticipanteBolaoResource {
	
	@Autowired
	private ParticipanteBolaoService participanteBolaoService;
	
	@GetMapping(value = "/{id}")
	public @ResponseBody ParticipanteBolao findById(@PathVariable Integer id) {
		
		ParticipanteBolao bolao = participanteBolaoService.findById(id);

		return bolao;
	}
	
	@GetMapping
	public @ResponseBody List<ParticipanteBolao> findAll() {
		
		List<ParticipanteBolao> bolaoList = participanteBolaoService.findAll();

		return bolaoList;
	}
	
	@PostMapping
	public @ResponseBody ParticipanteBolao save(@RequestBody ParticipanteBolao participanteBolao) {

		participanteBolao = participanteBolaoService.save(participanteBolao);

		return participanteBolao;
	}
	
	@DeleteMapping(value = "/{id}")
	public void delete(@PathVariable Integer id) {
		
		participanteBolaoService.delete(id);
	}
	
	@PutMapping
	public @ResponseBody ParticipanteBolao update(@RequestBody ParticipanteBolao participanteBolao) {
		
		ParticipanteBolao novoBolao = participanteBolaoService.update(participanteBolao);

		return novoBolao;
	}
}