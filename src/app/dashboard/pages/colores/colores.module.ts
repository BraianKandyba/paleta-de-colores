import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColoresRoutingModule } from './colores-routing.module';
import { ColoresComponent } from './colores.component';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  declarations: [
    ColoresComponent
  ],
  imports: [
    CommonModule,
    ColoresRoutingModule,
    SharedModule,
    
  ],
  exports:[
    ColoresComponent
  ]
})
export class ColoresModule { }
