import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { Usuario } from '../../../models/usuario'
import { UsuarioService } from '../../../services/usuario.service'
import { DialogService } from '../../../services/dialog.service'
import { NotificationService } from '../../../services/notification.service'

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})

export class UsuarioComponent implements OnInit {

  displayedColumns: string[] = ['login', 'nome', 'email', 'dataNascimento', 'dataCadastro', 'ativo', 'acoes'];

  usuarioList: Usuario[] = [];
  dataSource: MatTableDataSource<Usuario>;
  isLoading = true;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private usuarioService: UsuarioService, private router: Router, private dialogService: DialogService, private notificationService: NotificationService) { }

  ngOnInit(): void {
	this.findAll();
  }
  
  findAll(): void {
	this.usuarioService.findAll().subscribe((listUsuarios) => {
		this.isLoading = false;
		this.dataSource = new MatTableDataSource(listUsuarios);
		
		this.dataSource.paginator = this.paginator;
	}, error => this.isLoading = false);
  }
  
  cadastrar(): void {
	this.router.navigate(['admin/usuario-cadastro']);
  }
  
  editar(id: any): void {
	this.router.navigate(['admin/usuario-cadastro', id]);
  }
  
  deletar(id: any): void {
	this.dialogService.openConfirmDialog("Deseja excluir o registro em definitivo?")
	.afterClosed().subscribe(res => {
		if (res) {
			this.usuarioService.delete(id).subscribe((resposta) => {
				if (resposta === null) {
					this.notificationService.success('Usuário deletado com sucesso');
					this.findAll();
				}
			})			
		}
	});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
