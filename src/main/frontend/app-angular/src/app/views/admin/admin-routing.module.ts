import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { FuncaoCadastroComponent } from './funcao-cadastro/funcao-cadastro.component';
import { FuncaoComponent } from './funcao/funcao.component';
import { PaisCadastroComponent } from './pais-cadastro/pais-cadastro.component';
import { PaisComponent } from './pais/pais.component';
import { EventoCadastroComponent } from './evento-cadastro/evento-cadastro.component';
import { EventoComponent } from './evento/evento.component';
import { GrupoCadastroComponent } from './grupo-cadastro/grupo-cadastro.component';
import { GrupoComponent } from './grupo/grupo.component';
import { BolaoCadastroComponent } from './bolao-cadastro/bolao-cadastro.component';
import { BolaoComponent } from './bolao/bolao.component';

const routes: Routes = [
	{
		path: '',
    	data: {
      		title: 'Admin'
    	},
    	children: [
      		{
        		path: 'usuario',
		        component: UsuarioComponent,
		        data: {
		        	title: 'Usuários'
        		}
      		},
      		{
        		path: 'usuario-cadastro',
		        component: UsuarioCadastroComponent,
		        data: {
		        	title: 'Cadastrar Usuário'
        		}
      		},
      		{
        		path: 'usuario-cadastro/:id',
		        component: UsuarioCadastroComponent,
		        data: {
		        	title: 'Editar Usuário'
        		}
      		},
      		{
        		path: 'funcao',
		        component: FuncaoComponent,
		        data: {
		        	title: 'Funções'
        		}
      		},
      		{
        		path: 'funcao-cadastro',
		        component: FuncaoCadastroComponent,
		        data: {
		        	title: 'Cadastrar Função'
        		}
      		},
      		{
        		path: 'funcao-cadastro/:id',
		        component: FuncaoCadastroComponent,
		        data: {
		        	title: 'Editar Função'
        		}
      		},
      		{
        		path: 'pais',
		        component: PaisComponent,
		        data: {
		        	title: 'Paises'
        		}
      		},
      		{
        		path: 'pais-cadastro',
		        component: PaisCadastroComponent,
		        data: {
		        	title: 'Cadastrar Pais'
        		}
      		},
      		{
        		path: 'pais-cadastro/:id',
		        component: PaisCadastroComponent,
		        data: {
		        	title: 'Editar Pais'
        		}
      		},
      		{
        		path: 'evento',
		        component: EventoComponent,
		        data: {
		        	title: 'Eventos'
        		}
      		},
      		{
        		path: 'evento-cadastro',
		        component: EventoCadastroComponent,
		        data: {
		        	title: 'Cadastrar Evento'
        		}
      		},
      		{
        		path: 'evento-cadastro/:id',
		        component: EventoCadastroComponent,
		        data: {
		        	title: 'Editar Evento'
        		}
      		},
      		{
        		path: 'grupo',
		        component: GrupoComponent,
		        data: {
		        	title: 'Grupos'
        		}
      		},
      		{
        		path: 'grupo-cadastro',
		        component: GrupoCadastroComponent,
		        data: {
		        	title: 'Cadastrar Grupo'
        		}
      		},
      		{
        		path: 'grupo-cadastro/:id',
		        component: GrupoCadastroComponent,
		        data: {
		        	title: 'Editar Grupo'
        		}
      		},
      		{
        		path: 'bolao',
		        component: BolaoComponent,
		        data: {
		        	title: 'Bolões'
        		}
      		},
      		{
        		path: 'bolao-cadastro',
		        component: BolaoCadastroComponent,
		        data: {
		        	title: 'Cadastrar Bolão'
        		}
      		},
      		{
        		path: 'bolao-cadastro/:id',
		        component: BolaoCadastroComponent,
		        data: {
		        	title: 'Editar Bolão'
        		}
      		}
  		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
