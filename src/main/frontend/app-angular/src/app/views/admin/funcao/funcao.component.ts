import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { Funcao } from '../../../models/funcao'
import { FuncaoService } from '../../../services/funcao.service'
import { DialogService } from '../../../services/dialog.service'
import { NotificationService } from '../../../services/notification.service'

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-funcao',
  templateUrl: './funcao.component.html',
  styleUrls: ['./funcao.component.scss']
})
export class FuncaoComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'descricao', 'acoes'];

  funcaoList: Funcao[] = [];
  dataSource: MatTableDataSource<Funcao>;
  isLoading = true;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private funcaoService: FuncaoService, private router: Router, private dialogService: DialogService, private notificationService: NotificationService) { }

  ngOnInit(): void {
	this.findAll();
  }
  
  findAll(): void {
	this.funcaoService.findAll().subscribe((listFuncoes) => {
		this.isLoading = false;
		this.dataSource = new MatTableDataSource(listFuncoes);
		
		this.dataSource.paginator = this.paginator;
	}, error => this.isLoading = false);
  }
  
  cadastrar(): void {
	this.router.navigate(['admin/funcao-cadastro']);
  }
  
  editar(id: any): void {
	this.router.navigate(['admin/funcao-cadastro', id]);
  }
  
  deletar(id: any): void {
	this.dialogService.openConfirmDialog("Deseja excluir o registro em definitivo?")
	.afterClosed().subscribe(res => {
		if (res) {
			this.funcaoService.delete(id).subscribe((resposta) => {
				if (resposta === null) {
					this.notificationService.success('Função deletada com sucesso');
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
