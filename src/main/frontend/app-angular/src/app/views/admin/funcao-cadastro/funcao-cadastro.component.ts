import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';

import { Funcao } from 'src/app/models/funcao';
import { FuncaoService } from 'src/app/services/funcao.service';
import { NotificationService } from '../../../services/notification.service'

@Component({
  selector: 'app-funcao-cadastro',
  templateUrl: './funcao-cadastro.component.html',
  styleUrls: ['./funcao-cadastro.component.scss']
})
export class FuncaoCadastroComponent implements OnInit {

  funcao: Funcao = {
	nome: '',
	descricao: ''
  }

  id: number; // id do funcao
  state: string = 'cadastrar';

  constructor(private route: ActivatedRoute, private router: Router, private funcaoService: FuncaoService, private notificationService: NotificationService) { }

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
	this.funcaoService.save(this.funcao).subscribe((funcao) => {
		this.notificationService.success('Função salvo com sucesso');
		this.router.navigate(['admin/funcao']);
	}, err => {
		this.notificationService.warn('Falha ao salvar o função');
	})
  }
  
  atualizar(): void {
	this.funcaoService.update(this.funcao).subscribe((funcao) => {
		this.notificationService.success('Função atualizada com sucesso');
		this.router.navigate(['admin/funcao']);
	}, err => {
		this.notificationService.warn('Falha ao atualizar a função');
	})
  }
  
  carregarEditar(): void {
	this.funcaoService.findById(this.id).subscribe((funcao) => {
		this.funcao = funcao;
	})
  }
  
  cancelar(): void {
	this.router.navigate(['admin/funcao']);
  }
}
