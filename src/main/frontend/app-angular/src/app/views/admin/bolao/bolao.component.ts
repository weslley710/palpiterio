import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { Bolao } from '../../../models/bolao'
import { BolaoService } from '../../../services/bolao.service'
import { DialogService } from '../../../services/dialog.service'
import { NotificationService } from '../../../services/notification.service'

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-bolao',
  templateUrl: './bolao.component.html',
  styleUrls: ['./bolao.component.scss']
})
export class BolaoComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'dataInicio', 'evento', 'acoes'];

  bolaoList: Bolao[] = [];
  dataSource: MatTableDataSource<Bolao>;
  isLoading = true;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private bolaoService: BolaoService, private router: Router, private dialogService: DialogService, private notificationService: NotificationService) { }

  ngOnInit(): void {
	this.findAll();
  }
  
  findAll(): void {
	this.bolaoService.findAll().subscribe((listBoloes) => {
		this.isLoading = false;
		this.dataSource = new MatTableDataSource(listBoloes);
		
		this.dataSource.paginator = this.paginator;
	}, error => this.isLoading = false);
  }
  
  cadastrar(): void {
	this.router.navigate(['admin/bolao-cadastro']);
  }
  
  editar(id: any): void {
	this.router.navigate(['admin/bolao-cadastro', id]);
  }
  
  deletar(id: any): void {
	this.dialogService.openConfirmDialog("Deseja excluir o registro em definitivo?")
	.afterClosed().subscribe(res => {
		if (res) {
			this.bolaoService.delete(id).subscribe((resposta) => {
				if (resposta === null) {
					this.notificationService.success('Bolão deletado com sucesso');
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
