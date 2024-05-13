import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuentesRoutingModule } from './fuentes-routing.module';
import { FuentesComponent } from './fuentes.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FuentesComponent
  ],
  imports: [
    CommonModule,
    FuentesRoutingModule,
    SharedModule,
    FormsModule
  ],
  exports:[
    FuentesComponent
  ]
})
export class FuentesModule { }
