import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';

import {FormControl} from '@angular/forms';

import { Grupo } from 'src/app/models/grupo';
import { GrupoService } from 'src/app/services/grupo.service';

import { Evento } from 'src/app/models/evento';
import { EventoService } from 'src/app/services/evento.service';

import { Pais } from 'src/app/models/pais';
import { PaisService } from 'src/app/services/pais.service';

import { FaseEvento } from 'src/app/models/fase-evento';

import { NotificationService } from '../../../services/notification.service'

@Component({
  selector: 'app-grupo-cadastro',
  templateUrl: './grupo-cadastro.component.html',
  styleUrls: ['./grupo-cadastro.component.scss']
})
export class GrupoCadastroComponent implements OnInit {

  grupoControle = new FormControl();

  grupo: Grupo = {
	nome: '',
	qtdClassificados: null,
	faseEvento: null,
	participanteList: []
  }
  
  evento: Evento;
  eventoList: Evento[] = [];
  faseEventoList: FaseEvento[] = [];
  
  paisList: Pais[] = [];
  paisListAux: Pais[] = [];
  paisListSelected: Pais[] = [];

  id: number; // id do grupo
  state: string = 'cadastrar';

  constructor(private route: ActivatedRoute, private router: Router, private grupoService: GrupoService, private eventoService: EventoService, private paisService: PaisService, private notificationService: NotificationService) { }

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
	
	this.paisService.findAll().subscribe((paisList) => {
		this.paisList = paisList;
		this.paisListAux = paisList;
	});
  }
  
  salvar(): void {
	this.grupo.participanteList = this.paisListSelected;

	this.grupoService.save(this.grupo).subscribe((grupo) => {
		this.notificationService.success('Grupo salvo com sucesso');
		this.router.navigate(['admin/grupo']);
	}, err => {
		this.notificationService.warn('Falha ao salvar o grupo');
	})
  }
  
  atualizar(): void {
	this.grupo.participanteList = this.paisListSelected;
	
	this.grupoService.update(this.grupo).subscribe((grupo) => {
		this.notificationService.success('Grupo atualizado com sucesso');
		this.router.navigate(['admin/grupo']);
	}, err => {
		this.notificationService.warn('Falha ao atualizar a grupo');
	})
  }
  
  carregarEditar(): void {
	this.grupoService.findById(this.id).subscribe((grupo) => {
		this.grupo = grupo;
		this.paisListSelected = this.grupo.participanteList;
		
		this.evento = this.grupo.faseEvento.evento;
		this.eventoService.findFaseEventoByEvento(this.evento).subscribe((faseEventoList) => {
			 this.faseEventoList = faseEventoList;
		});
	})
  }
  
  cancelar(): void {
	this.router.navigate(['admin/grupo']);
  }
  
  addParticipante(pais: Pais): void {
  	if (this.paisListSelected.indexOf(pais) !== -1) {
  		this.notificationService.warn('Participante já adicionado!');
	} else {
		this.paisListSelected.push(pais);		
	}
  }
  
  onEventoChange($event: any, evento: Evento) {
    if ($event.isUserInput) { // ignore on deselection of the previous option
	    this.eventoService.findFaseEventoByEvento(evento).subscribe((faseEventoList) => {
			 this.faseEventoList = faseEventoList;
		});
	}
  }
  
  displayFn(pais: Pais): String {
  	return pais.nome;
  }

  // Utilizado para bind do objeto combo
  compareWith(item1, item2) {
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.paisListAux = this.paisList.filter(pais => pais.nome.toLowerCase().includes(filterValue.trim().toLowerCase()));
  }
}
