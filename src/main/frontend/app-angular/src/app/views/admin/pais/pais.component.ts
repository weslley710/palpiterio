import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { Pais } from '../../../models/pais'
import { PaisService } from '../../../services/pais.service'
import { DialogService } from '../../../services/dialog.service'
import { NotificationService } from '../../../services/notification.service'

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.scss']
})
export class PaisComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'bandeira', 'sigla', 'acoes'];

  paisList: Pais[] = [];
  dataSource: MatTableDataSource<Pais>;
  isLoading = true;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private paisService: PaisService, private router: Router, private dialogService: DialogService, private notificationService: NotificationService) { }

  ngOnInit(): void {
	this.findAll();
  }
  
  findAll(): void {
	this.paisService.findAll().subscribe((listPaises) => {
		this.isLoading = false;
		this.dataSource = new MatTableDataSource(listPaises);
		
		this.dataSource.paginator = this.paginator;
	}, error => this.isLoading = false);
  }
  
  cadastrar(): void {
	this.router.navigate(['admin/pais-cadastro']);
  }
  
  editar(id: any): void {
	this.router.navigate(['admin/pais-cadastro', id]);
  }
  
  deletar(id: any): void {
	this.dialogService.openConfirmDialog("Deseja excluir o registro em definitivo?")
	.afterClosed().subscribe(res => {
		if (res) {
			this.paisService.delete(id).subscribe((resposta) => {
				if (resposta === null) {
					this.notificationService.success('Pais deletada com sucesso');
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
