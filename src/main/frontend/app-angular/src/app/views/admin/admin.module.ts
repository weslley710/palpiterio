import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../../modules/app-material/app-material.module';

import { AdminRoutingModule } from './admin-routing.module';

import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { FuncaoComponent } from './funcao/funcao.component';
import { FuncaoCadastroComponent } from './funcao-cadastro/funcao-cadastro.component';
import { PaisComponent } from './pais/pais.component';
import { PaisCadastroComponent } from './pais-cadastro/pais-cadastro.component';
import { EventoComponent } from './evento/evento.component';
import { EventoCadastroComponent } from './evento-cadastro/evento-cadastro.component';
import { GrupoComponent } from './grupo/grupo.component';
import { GrupoCadastroComponent } from './grupo-cadastro/grupo-cadastro.component';
import { BolaoComponent } from './bolao/bolao.component';
import { BolaoCadastroComponent } from './bolao-cadastro/bolao-cadastro.component';

@NgModule({
  declarations: [
    UsuarioComponent,
    UsuarioCadastroComponent,
    FuncaoComponent,
    FuncaoCadastroComponent,
    PaisComponent,
    PaisCadastroComponent,
    EventoComponent,
    EventoCadastroComponent,
    GrupoComponent,
    GrupoCadastroComponent,
    BolaoComponent,
    BolaoCadastroComponent
  ],
  imports: [
	FormsModule,
	ReactiveFormsModule,
    AdminRoutingModule,
    AppMaterialModule,
    CommonModule
  ]
})

export class AdminModule { }