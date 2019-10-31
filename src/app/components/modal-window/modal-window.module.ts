import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalWindowComponent } from './modal-window.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ModalWindowComponent],
  exports: [ModalWindowComponent]
})
export class ModalWindowModule { }
