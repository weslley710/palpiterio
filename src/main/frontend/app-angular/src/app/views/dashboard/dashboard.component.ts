import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import { MatTabGroup } from '@angular/material/tabs';

import { Rodada } from 'src/app/models/rodada';
import { Confronto } from 'src/app/models/confronto';
import { Palpite } from 'src/app/models/palpite';

import { RodadaService } from 'src/app/services/rodada.service';
import { ConfrontoService } from 'src/app/services/confronto.service';
import { PalpiteService } from 'src/app/services/palpite.service';

import { NotificationService } from 'src/app/services/notification.service';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  rodadaTabList: Rodada[] = [];
  confrontoList: Confronto[] = [];
  
  dashboard: string = 'palpite';
  state: string = 'cadastrar';
  palpitesEsperados: number;
  palpitesRegistrados: number;
  
  cor: string = '#2EADD3';
  
  constructor(private rodadaService: RodadaService, private confrontoService: ConfrontoService, private palpiteService: PalpiteService, private notificationService: NotificationService) { }

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
	}
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
