import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColoresComponent } from './dashboard/pages/colores/colores.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren:() => import('./dashboard/dashboard.module').then((m)=>m.DashboardModule)
  },
  {
    path: '**',
    redirectTo: 'dashboard/colores'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
