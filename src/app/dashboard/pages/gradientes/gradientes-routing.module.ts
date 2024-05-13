import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradientesComponent } from './gradientes.component';

const routes: Routes = [
  {
    path: '',
    component: GradientesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradientesRoutingModule { }
