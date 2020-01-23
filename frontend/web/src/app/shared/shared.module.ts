import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';

const materialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
];

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
