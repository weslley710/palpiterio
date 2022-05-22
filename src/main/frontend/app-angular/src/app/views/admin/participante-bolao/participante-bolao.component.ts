import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { ParticipanteBolao } from '../../../models/participante-bolao'
import { ParticipanteBolaoService } from '../../../services/participante-bolao.service'
import { DialogService } from '../../../services/dialog.service'
import { NotificationService } from '../../../services/notification.service'

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-participante-bolao',
  templateUrl: './participante-bolao.component.html',
  styleUrls: ['./participante-bolao.component.scss']
})
export class ParticipanteBolaoComponent implements OnInit {

  displayedColumns: string[] = ['bolao', 'usuario', 'ativo'];

  participanteBolaoList: ParticipanteBolao[] = [];
  dataSource: MatTableDataSource<ParticipanteBolao>;
  isLoading = true;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private participanteBolaoService: ParticipanteBolaoService, private router: Router, private dialogService: DialogService, private notificationService: NotificationService) { }

  ngOnInit(): void {
	this.findAll();
  }
  
  findAll(): void {
	this.participanteBolaoService.findAll().subscribe((listParticipantesBoloes) => {
		this.isLoading = false;
		this.dataSource = new MatTableDataSource(listParticipantesBoloes);
		
		this.dataSource.paginator = this.paginator;
	}, error => this.isLoading = false);
  }
  
  salvar(participanteBolao: ParticipanteBolao, isAtivo: Boolean): void {
	
	participanteBolao.isAtivo = isAtivo;

	this.participanteBolaoService.save(participanteBolao).subscribe((participanteBolao) => {
		this.notificationService.success('Participante atualizado com sucesso');
	}, err => {
		this.notificationService.warn('Falha ao atualizar o registro');
	})
  }
  
//  cadastrar(): void {
//	this.router.navigate(['admin/participante-bolao-cadastro']);
//  }
  
//  editar(id: any): void {
//	this.router.navigate(['admin/participante-bolao-cadastro', id]);
//  }
  
//  deletar(id: any): void {
//	this.dialogService.openConfirmDialog("Deseja excluir o registro em definitivo?")
//	.afterClosed().subscribe(res => {
//		if (res) {
//			this.participanteBolaoService.delete(id).subscribe((resposta) => {
//				if (resposta === null) {
//					this.notificationService.success('Bolão deletado com sucesso');
//					this.findAll();
//				}
//			})			
//		}
//	});
//  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
