import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import { MatTabGroup } from '@angular/material/tabs';

import { Rodada } from 'src/app/models/rodada';
import { Confronto } from 'src/app/models/confronto';
import { Palpite } from 'src/app/models/palpite';
import { Bolao } from 'src/app/models/bolao';
import { ParticipanteBolao } from 'src/app/models/participante-bolao';

import { RodadaService } from 'src/app/services/rodada.service';
import { ConfrontoService } from 'src/app/services/confronto.service';
import { PalpiteService } from 'src/app/services/palpite.service';
import { BolaoService } from 'src/app/services/bolao.service';
import { ParticipanteBolaoService } from 'src/app/services/participante-bolao.service';
import { DialogService } from 'src/app/services/dialog.service';

import { NotificationService } from 'src/app/services/notification.service';

import { MatTableDataSource } from '@angular/material/table';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'dataInicio', 'usuario', 'evento', 'acoes'];
  
  bolaoList: Bolao[] = [];
  dsBolao: MatTableDataSource<Bolao>;

  rodadaTabList: Rodada[] = [];
  confrontoList: Confronto[] = [];
  participanteBolaoList: ParticipanteBolao[] = [];
  
  dashboard: string = 'palpite';
  state: string = 'cadastrar';
  palpitesEsperados: number;
  palpitesRegistrados: number;
  participantesPagos: number;
  participanteInscrito = false;
  participantePago = false;
  
  participanteBolao: ParticipanteBolao = {
	id: null,
	bolao: null,
	usuario: null,
	isAtivo: null
  };
  
  cor: string = '#2EADD3';
  
  dataAtual: Date = new Date();
  
  isLoading = true;
  
  constructor(private rodadaService: RodadaService, private confrontoService: ConfrontoService, private palpiteService: PalpiteService, private bolaoService: BolaoService, 
  private notificationService: NotificationService, private dialogService: DialogService, private participanteBolaoService: ParticipanteBolaoService, private authService: AuthenticationService) { }

  ngOnInit(): void {
  	this.rodadaService.findAll().subscribe((rodadaList) => {
		this.rodadaTabList = rodadaList.filter((value, index, rodada) => rodada.map(x => x.descricao).indexOf(value.descricao) == index);
	});

	this.loadConfrontos();
  }
  
  loadConfrontos(): void {
	
	this.palpitesEsperados = 0;
	this.palpitesRegistrados = 0;
	
	this.confrontoService.findAll().subscribe((confrontoList) => {
		
		for (let confronto of confrontoList) {
  			if (confronto.palpiteList === null || !confronto.palpiteList.length) {
				confronto.palpiteList.push({} as Palpite);
				
				this.palpitesEsperados++;
				this.palpitesRegistrados = 0;
			} else {
				this.state = 'editar';
				
				this.palpitesEsperados++;
				this.palpitesRegistrados = this.palpitesEsperados;
			}
		}

		this.confrontoList = confrontoList;
	}); 
  }
  
  salvar(): void {
	this.palpiteService.saveAll(this.confrontoList).subscribe((palpiteList) => {

		this.loadConfrontos();

		this.notificationService.success('Palpites salvos com sucesso');
	}, err => {
		this.notificationService.warn('Falha ao salvar os palpites');
	})
  }
  
  changeDashboard(dashboard): void {
	this.dashboard = dashboard;
	
	if (dashboard == 'palpite') {
		this.cor = '#2EADD3';
	} else if (dashboard == 'bolao') {
		this.cor = '#FF6347';
		
		this.findAllBolao();
	}
  }
  
  findAllBolao(): void {
	this.bolaoService.findAll().subscribe((listBoloes) => {
		this.isLoading = false;
		this.dsBolao = new MatTableDataSource(listBoloes);
		
		this.participanteBolaoService.findAll().subscribe((participanteBolaoList) => {
			this.participanteBolaoList = participanteBolaoList;
			
			this.participantesPagos = participanteBolaoList.filter(participanteBolao => participanteBolao.isAtivo == true).length;
			this.participanteInscrito = (participanteBolaoList.filter(participanteBolao => participanteBolao.usuario.id == this.authService.userLogged().id).length > 0 ? true : false);
			this.participantePago = (participanteBolaoList.filter(participanteBolao => participanteBolao.usuario.id == this.authService.userLogged().id)[0].isAtivo == true ? true : false);
		})
		
	}, error => this.isLoading = false);
  }
  
  participar(bolao: Bolao): void {
	
	var dtAgora = new Date();
	var dtEvento = new Date(bolao.dataInicio);
	
	if (dtEvento > dtAgora) {
		this.dialogService.openConfirmDialog("Confirma o desejo de participar do bolão?")
		.afterClosed().subscribe(res => {
			if (res) {
				let participanteBolao = {} as ParticipanteBolao;
				participanteBolao.bolao = bolao;
				participanteBolao.isAtivo = false;
				
				this.participanteBolaoService.save(participanteBolao).subscribe((participanteBolao) => {
					if (participanteBolao !== null) {
						this.notificationService.success('Inscrição realizada, sua participação depende da confirmação de pagamento da taxa de inscrição');
						
						this.showQrCode();
						
						this.findAllBolao();
					}
				})			
			}
		});	
	} else {
		this.notificationService.warn('Lamento, mas não é possível realizar a inscrição após o inicio do evento!');
	}
  }
  
  showQrCode(): void {
	this.dialogService.openPaymentDialog();
  }
  
  goTabClick(tabGroup: MatTabGroup) {
  	if (!tabGroup || !(tabGroup instanceof MatTabGroup)) 
  		return;

  	const tabCount = tabGroup._tabs.length;
  	tabGroup.selectedIndex = (tabGroup.selectedIndex + 1) % tabCount;
  }
  
  backTabClick(tabGroup: MatTabGroup) {
  	if (!tabGroup || !(tabGroup instanceof MatTabGroup)) 
  		return;

  	const tabCount = tabGroup._tabs.length;
  	tabGroup.selectedIndex = (tabGroup.selectedIndex - 1) % tabCount;
  }
}
