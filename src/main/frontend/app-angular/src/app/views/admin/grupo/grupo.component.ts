import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { Grupo } from '../../../models/grupo'
import { GrupoService } from '../../../services/grupo.service'
import { DialogService } from '../../../services/dialog.service'
import { NotificationService } from '../../../services/notification.service'

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss']
})
export class GrupoComponent implements OnInit {

  displayedColumns: string[] = ['evento', 'faseEvento', 'nome', 'participanteList', 'acoes'];

  grupoList: Grupo[] = [];
  dataSource: MatTableDataSource<Grupo>;
  isLoading = true;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private grupoService: GrupoService, private router: Router, private dialogService: DialogService, private notificationService: NotificationService) { }

  ngOnInit(): void {
	this.findAll();
  }
  
  findAll(): void {
	this.grupoService.findAll().subscribe((listGrupos) => {
		this.isLoading = false;
		this.dataSource = new MatTableDataSource(listGrupos);

		this.dataSource.paginator = this.paginator;
	}, error => this.isLoading = false);
  }
  
  cadastrar(): void {
	this.router.navigate(['admin/grupo-cadastro']);
  }
  
  editar(id: any): void {
	this.router.navigate(['admin/grupo-cadastro', id]);
  }
  
  deletar(id: any): void {
	this.dialogService.openConfirmDialog("Deseja excluir o registro em definitivo?")
	.afterClosed().subscribe(res => {
		if (res) {
			this.grupoService.delete(id).subscribe((resposta) => {
				if (resposta === null) {
					this.notificationService.success('Grupo deletado com sucesso');
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
