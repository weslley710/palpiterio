import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';

import { Pais } from 'src/app/models/pais';
import { PaisService } from 'src/app/services/pais.service';
import { NotificationService } from '../../../services/notification.service'

@Component({
  selector: 'app-pais-cadastro',
  templateUrl: './pais-cadastro.component.html',
  styleUrls: ['./pais-cadastro.component.scss']
})
export class PaisCadastroComponent implements OnInit {

  pais: Pais = {
	nome: '',
	sigla: '',
	bandeira: ''
  }

  id: number; // id do pais
  state: string = 'cadastrar';

  constructor(private route: ActivatedRoute, private router: Router, private paisService: PaisService, private notificationService: NotificationService) { }

  ngOnInit(): void {
	this.route.params.subscribe((params: Params) => {
		this.id = params['id'];

		if (this.id != undefined && this.id != 0) {
			this.carregarEditar();
			this.state = 'editar';
		}
	})
  }
  
  salvar(): void {
	this.paisService.save(this.pais).subscribe((pais) => {
		this.notificationService.success('Pais salvo com sucesso');
		this.router.navigate(['admin/pais']);
	}, err => {
		this.notificationService.warn('Falha ao salvar o pais');
	})
  }
  
  atualizar(): void {
	this.paisService.update(this.pais).subscribe((pais) => {
		this.notificationService.success('Pais atualizado com sucesso');
		this.router.navigate(['admin/pais']);
	}, err => {
		this.notificationService.warn('Falha ao atualizar a pais');
	})
  }
  
  carregarEditar(): void {
	this.paisService.findById(this.id).subscribe((pais) => {
		this.pais = pais;
	})
  }
  
  cancelar(): void {
	this.router.navigate(['admin/pais']);
  }
}
