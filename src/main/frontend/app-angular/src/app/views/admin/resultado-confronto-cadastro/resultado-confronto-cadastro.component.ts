import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';

import { ResultadoConfronto } from 'src/app/models/resultado-confronto';
import { ResultadoConfrontoService } from 'src/app/services/resultado-confronto.service';

import { Confronto } from 'src/app/models/confronto';
import { ConfrontoService } from 'src/app/services/confronto.service';

import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-resultado-confronto-cadastro',
  templateUrl: './resultado-confronto-cadastro.component.html',
  styleUrls: ['./resultado-confronto-cadastro.component.scss']
})
export class ResultadoConfrontoCadastroComponent implements OnInit {

  resultadoConfronto: ResultadoConfronto = {
	placarCasa: null,
	placarFora: null,
	confronto: null
  }

  confrontoList: Confronto[] = [];

  id: number; // id do resultado-confronto
  state: string = 'cadastrar';

  constructor(private route: ActivatedRoute, private router: Router, private resultadoConfrontoService: ResultadoConfrontoService, private notificationService: NotificationService, private confrontoService: ConfrontoService) { }

  ngOnInit(): void {
	
	this.route.params.subscribe((params: Params) => {
		this.id = params['id'];

		if (this.id != undefined && this.id != 0) {
			this.carregarEditar();
			this.state = 'editar';
		}
	})
	
	this.confrontoService.findAll().subscribe((confrontoList) => {
		this.confrontoList = confrontoList;
	});
  }
  
  salvar(): void {
	this.resultadoConfrontoService.save(this.resultadoConfronto).subscribe((resultadoConfronto) => {
		this.notificationService.success('Resultado do Confronto salvo com sucesso');
		this.router.navigate(['admin/resultado-confronto']);
	}, err => {
		this.notificationService.warn('Falha ao salvar o resultado do Resultado do Confronto');
	})
  }
  
  atualizar(): void {
	this.resultadoConfrontoService.update(this.resultadoConfronto).subscribe((resultadoCconfronto) => {
		this.notificationService.success('Resultado do Confronto atualizado com sucesso');
		this.router.navigate(['admin/resultado-confronto']);
	}, err => {
		this.notificationService.warn('Falha ao atualizar a Resultado do Confronto');
	})
  }
  
  carregarEditar(): void {
	this.resultadoConfrontoService.findById(this.id).subscribe((resultadoConfronto) => {
		this.resultadoConfronto = resultadoConfronto;
	})
  }
  
  cancelar(): void {
	this.router.navigate(['admin/resultado-confronto']);
  }
  
  // Utilizado para bind do objeto combo
  compareWith(item1, item2) {
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }
}
