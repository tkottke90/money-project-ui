import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';


import { BaseComponent } from './base/base.component';

@NgModule({
  declarations: [BaseComponent],
  imports: [
    CommonModule,
    MatToolbarModule
  ],
  exports: [ BaseComponent ]
})
export class SharedModule { }
