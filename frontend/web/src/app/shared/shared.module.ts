import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatIconRegistry,
  MatInputModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { LoaderComponent } from '@components/loader/loader.component';

const materialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatIconModule,
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
    LoaderComponent,
  ],
  declarations: [LoaderComponent],
})
export class SharedModule {
  constructor(private matIconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'fb',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/facebook-logo.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'google',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/google-logo.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'wheel',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/wheel.svg'),
    );
  }
}
