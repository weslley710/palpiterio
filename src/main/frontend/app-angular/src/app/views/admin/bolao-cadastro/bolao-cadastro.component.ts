import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';

import { Bolao } from 'src/app/models/bolao';
import { BolaoService } from 'src/app/services/bolao.service';

import { Evento } from 'src/app/models/evento';
import { EventoService } from 'src/app/services/evento.service';

import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-bolao-cadastro',
  templateUrl: './bolao-cadastro.component.html',
  styleUrls: ['./bolao-cadastro.component.scss']
})
export class BolaoCadastroComponent implements OnInit {

  bolao: Bolao = {
	nome: '',
	dataInicio: null,
	evento: null
  }

  eventoList: Evento[] = [];

  id: number; // id do bolao
  state: string = 'cadastrar';

  constructor(private route: ActivatedRoute, private router: Router, private bolaoService: BolaoService, private notificationService: NotificationService, private eventoService: EventoService) { }

  ngOnInit(): void {
	
	this.route.params.subscribe((params: Params) => {
		this.id = params['id'];

		if (this.id != undefined && this.id != 0) {
			this.carregarEditar();
			this.state = 'editar';
		}
	})
	
	this.eventoService.findAll().subscribe((eventoList) => {
		this.eventoList = eventoList;
	});
  }
  
  salvar(): void {
	this.bolaoService.save(this.bolao).subscribe((bolao) => {
		this.notificationService.success('Bolão salvo com sucesso');
		this.router.navigate(['admin/bolao']);
	}, err => {
		this.notificationService.warn('Falha ao salvar o bolão');
	})
  }
  
  atualizar(): void {
	this.bolaoService.update(this.bolao).subscribe((bolao) => {
		this.notificationService.success('Bolão atualizado com sucesso');
		this.router.navigate(['admin/bolao']);
	}, err => {
		this.notificationService.warn('Falha ao atualizar a bolão');
	})
  }
  
  carregarEditar(): void {
	this.bolaoService.findById(this.id).subscribe((bolao) => {
		this.bolao = bolao;
	})
  }
  
  cancelar(): void {
	this.router.navigate(['admin/bolao']);
  }
  
  // Utilizado para bind do objeto combo
  compareWith(item1, item2) {
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }
}
