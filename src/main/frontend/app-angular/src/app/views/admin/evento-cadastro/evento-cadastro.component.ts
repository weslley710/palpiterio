import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Params, Router } from '@angular/router';

import { Evento } from 'src/app/models/evento';
import { FaseEvento } from 'src/app/models/fase-evento';
import { EventoService } from 'src/app/services/evento.service';
import { NotificationService } from '../../../services/notification.service'

@Component({
  selector: 'app-evento-cadastro',
  templateUrl: './evento-cadastro.component.html',
  styleUrls: ['./evento-cadastro.component.scss']
})
export class EventoCadastroComponent implements OnInit {

  eventoFormGroup: FormGroup;
  faseEventoFormGroup: FormGroup;
  isEditable = true;

  faseEventoList: FaseEvento[] = [];

  evento: Evento = {
	nome: '',
	organizador: '',
	dataInicio: null,
	dataFim: null,
	faseEventoList: []
  }
  
  faseEvento: FaseEvento = {
	descricao: '',
	dataInicio: null,
	dataFim: null
  }

  id: number; // id do evento
  state: string = 'cadastrar';

  constructor(private route: ActivatedRoute, private router: Router, private eventoService: EventoService, private notificationService: NotificationService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
	
	this.eventoFormGroup = this._formBuilder.group({
      nome: ['', Validators.required],
      organizador: ['', Validators.required],
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
    });
    
    this.faseEventoFormGroup = this._formBuilder.group({
      descricao: [''],
      dataInicio: [''],
      dataFim: [''],
    });
    
	this.route.params.subscribe((params: Params) => {
		this.id = params['id'];

		if (this.id != undefined && this.id != 0) {
			this.carregarEditar();
			this.state = 'editar';
		}
	})
  }
  
  addFaseEvento(): void {
	
	var fieldsValidate = true;
	
	if (this.faseEventoFormGroup.get('descricao').value === '') {
    	this.faseEventoFormGroup.get('descricao').addValidators(Validators.required);
    	fieldsValidate = false;
	} 
	if (this.faseEventoFormGroup.get('dataInicio').value === '' || this.faseEventoFormGroup.get('dataInicio').value === null) { 
    	this.faseEventoFormGroup.get('dataInicio').addValidators(Validators.required);
    	fieldsValidate = false;
    } 
    if (this.faseEventoFormGroup.get('dataFim').value === '' || this.faseEventoFormGroup.get('dataFim').value === null) {
    	this.faseEventoFormGroup.get('dataFim').addValidators(Validators.required);
    	fieldsValidate = false;
    } 
    
    // Adiciona caso os campos estejam preenchidos
    if (fieldsValidate) {
		const faseEvento: FaseEvento = {
			descricao: this.faseEventoFormGroup.get("descricao").value,
			dataInicio: this.faseEventoFormGroup.get("dataInicio").value,
			dataFim: this.faseEventoFormGroup.get("dataFim").value
		};
	
		this.faseEventoList.push(faseEvento);

		this.faseEventoFormGroup.setValue({
		  descricao: '', 
		  dataInicio: '',
		  dataFim: ''
		});
	}
  }
  
  salvar(): void {
	
	this.evento.nome = this.eventoFormGroup.get("nome").value;
	this.evento.organizador = this.eventoFormGroup.get("organizador").value;
	this.evento.dataInicio = this.eventoFormGroup.get("dataInicio").value;
	this.evento.dataFim = this.eventoFormGroup.get("dataFim").value;
	
	this.evento.faseEventoList = this.faseEventoList;

	this.eventoService.save(this.evento).subscribe((evento) => {
		this.notificationService.success('Evento salvo com sucesso');
		this.router.navigate(['admin/evento']);
	}, err => {
		this.notificationService.warn('Falha ao salvar o evento');
	})
  }
  
  atualizar(): void {
	this.eventoService.update(this.evento).subscribe((evento) => {
		this.notificationService.success('Evento atualizado com sucesso');
		this.router.navigate(['admin/evento']);
	}, err => {
		this.notificationService.warn('Falha ao atualizar a evento');
	})
  }
  
  carregarEditar(): void {
	this.eventoService.findById(this.id).subscribe((evento) => {
		this.evento = evento;

		this.faseEventoList = this.evento.faseEventoList;
	})
  }
  
  cancelar(): void {
	this.router.navigate(['admin/evento']);
  }
}
