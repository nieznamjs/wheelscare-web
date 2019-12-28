import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

const materialModules = [];

@NgModule({
  imports: [
    ...materialModules,
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    ...materialModules,
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule { }
