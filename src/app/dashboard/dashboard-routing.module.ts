import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'colores',
        loadChildren:()=>import('./pages/colores/colores.module').then((m) => m.ColoresModule)
      },
      {
        path: 'gradientes',
        loadChildren:()=>import('./pages/gradientes/gradientes.module').then((m)=>m.GradientesModule)
      },
      {
        path: 'fuentes',
        loadChildren:()=>import('./pages/fuentes/fuentes.module').then((m)=>m.FuentesModule)
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
