import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

import { AuthGaurdService } from './services/auth-gaurd.service';

export const routes: Routes = [
  {
    path: '',
//    redirectTo: 'dashboard',
//    pathMatch: 'full',
	component: DefaultLayoutComponent,
    canActivate: [AuthGaurdService]
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'admin',
        canActivate: [AuthGaurdService],
        loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: 'dashboard',
        canActivate: [AuthGaurdService],
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
//  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}