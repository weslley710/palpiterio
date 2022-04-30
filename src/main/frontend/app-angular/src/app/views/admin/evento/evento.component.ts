import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { Evento } from '../../../models/evento'
import { EventoService } from '../../../services/evento.service'
import { DialogService } from '../../../services/dialog.service'
import { NotificationService } from '../../../services/notification.service'

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})
export class EventoComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'organizador', 'dataInicio', 'dataFim', 'acoes'];

  eventoList: Evento[] = [];
  dataSource: MatTableDataSource<Evento>;
  isLoading = true;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private eventoService: EventoService, private router: Router, private dialogService: DialogService, private notificationService: NotificationService) { }

  ngOnInit(): void {
	this.findAll();
  }
  
  findAll(): void {
	this.eventoService.findAll().subscribe((listEventos) => {
		this.isLoading = false;
		this.dataSource = new MatTableDataSource(listEventos);
		
		this.dataSource.paginator = this.paginator;
	}, error => this.isLoading = false);
  }
  
  cadastrar(): void {
	this.router.navigate(['admin/evento-cadastro']);
  }
  
  editar(id: any): void {
	this.router.navigate(['admin/evento-cadastro', id]);
  }
  
  deletar(id: any): void {
	this.dialogService.openConfirmDialog("Deseja excluir o registro em definitivo?")
	.afterClosed().subscribe(res => {
		if (res) {
			this.eventoService.delete(id).subscribe((resposta) => {
				if (resposta === null) {
					this.notificationService.success('Evento deletado com sucesso');
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
