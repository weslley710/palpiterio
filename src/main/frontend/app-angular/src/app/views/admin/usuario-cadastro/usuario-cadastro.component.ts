import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';

import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

import { Funcao } from 'src/app/models/funcao';
import { FuncaoService } from 'src/app/services/funcao.service';

import { NotificationService } from '../../../services/notification.service'

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.scss']
})
export class UsuarioCadastroComponent implements OnInit {

  usuario: Usuario = {
	nome: '',
	email: '',
	login: '',
	senha: '',
	isAtivo: true,
	dataNascimento: null,
	funcaoList: []
  }

  funcaoList: Funcao[] = [];
  funcaoListSelected: Funcao[] = [];

  id: number; // id do usuario
  state: string = 'cadastrar';

  constructor(private route: ActivatedRoute, private router: Router, private usuarioService: UsuarioService, private funcaoService: FuncaoService, private notificationService: NotificationService) { }

  ngOnInit(): void {
	// pega o id passado por parametro para edicao dos dados
	this.route.params.subscribe((params: Params) => {
		this.id = params['id'];

		if (this.id != undefined && this.id != 0) {
			this.carregarEditar();
			this.state = 'editar';
		}
	})
	
	this.funcaoService.findAll().subscribe((funcaoList) => {
		this.funcaoList = funcaoList;
	});
  }
  
  salvar(): void {
	this.usuarioService.save(this.usuario).subscribe((usuario) => {
		this.notificationService.success('Usuário salvo com sucesso');
		this.router.navigate(['admin/usuario']);
	}, err => {
		this.notificationService.warn('Falha ao salvar o usuário');
	})
  }
  
  atualizar(): void {
	this.usuarioService.update(this.usuario).subscribe((usuario) => {
		this.notificationService.success('Usuário atualizado com sucesso');
		this.router.navigate(['admin/usuario']);
	}, err => {
		this.notificationService.warn('Falha ao atualizar o usuário');
	})
  }
  
  carregarEditar(): void {
	this.funcaoListSelected = [];
	
	this.usuarioService.findById(this.id).subscribe((usuario) => {
		this.usuario = usuario;
	})
  }
  
  cancelar(): void {
	this.router.navigate(['admin/usuario']);
  }
  
  // Utilizado para bind do objeto funcao no combo
  compareWithFuncao(item1, item2) {
    return item1 && item2 ? item1.nome === item2.nome : item1 === item2;
  }
}
