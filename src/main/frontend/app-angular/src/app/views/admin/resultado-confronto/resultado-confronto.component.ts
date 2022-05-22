import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { ResultadoConfronto } from '../../../models/resultado-confronto'
import { ResultadoConfrontoService } from '../../../services/resultado-confronto.service'
import { DialogService } from '../../../services/dialog.service'
import { NotificationService } from '../../../services/notification.service'

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-resultado-confronto',
  templateUrl: './resultado-confronto.component.html',
  styleUrls: ['./resultado-confronto.component.scss']
})
export class ResultadoConfrontoComponent implements OnInit {

  displayedColumns: string[] = ['dtConfronto', 'confronto', 'acoes'];

  resultadoConfrontoList: ResultadoConfronto[] = [];
  dataSource: MatTableDataSource<ResultadoConfronto>;
  isLoading = true;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private resultadoConfrontoService: ResultadoConfrontoService, private router: Router, private dialogService: DialogService, private notificationService: NotificationService) { }

  ngOnInit(): void {
	this.findAll();
  }
  
  findAll(): void {
	this.resultadoConfrontoService.findAll().subscribe((resultadoConfrontoList) => {
		this.isLoading = false;
		this.dataSource = new MatTableDataSource(resultadoConfrontoList);
		
		this.dataSource.paginator = this.paginator;
	}, error => this.isLoading = false);
  }
  
  cadastrar(): void {
	this.router.navigate(['admin/resultado-confronto-cadastro']);
  }
  
  editar(id: any): void {
	this.router.navigate(['admin/resultado-confronto-cadastro', id]);
  }
  
  deletar(id: any): void {
	this.dialogService.openConfirmDialog("Deseja excluir o registro em definitivo?")
	.afterClosed().subscribe(res => {
		if (res) {
			this.resultadoConfrontoService.delete(id).subscribe((resposta) => {
				if (resposta === null) {
					this.notificationService.success('Resultado do Confronto deletado com sucesso');
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
