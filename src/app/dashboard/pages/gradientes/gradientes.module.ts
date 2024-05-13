import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GradientesRoutingModule } from './gradientes-routing.module';
import { GradientesComponent } from './gradientes.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GradientesComponent
  ],
  imports: [
    CommonModule,
    GradientesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports:[GradientesComponent]
})
export class GradientesModule { }
