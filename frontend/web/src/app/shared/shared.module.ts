import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoaderComponent } from '@components/loader/loader.component';
import { SidebarComponent } from '@components/sidebar/sidebar.component';

const materialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatIconModule,
];

interface CustomSvgIconConfig {
  name: string;
  url: string;
}

const customSvgIcons: CustomSvgIconConfig[] = [
  { name: 'fb', url: 'assets/images/icons/facebook-logo.svg' },
  { name: 'google', url: 'assets/images/icons/google-logo.svg' },
  { name: 'wheel', url: 'assets/images/icons/wheel.svg' },
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
    SidebarComponent,
  ],
  declarations: [LoaderComponent, SidebarComponent],
})
export class SharedModule {
  constructor(private matIconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    customSvgIcons.forEach(config => {
      this.matIconRegistry.addSvgIcon(config.name, this.sanitizer.bypassSecurityTrustResourceUrl(config.url));
    });
  }
}
