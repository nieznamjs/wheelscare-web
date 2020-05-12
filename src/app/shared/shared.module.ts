import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { LoaderComponent } from '@components/loader/loader.component';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { AddVehicleModalComponent } from '@components/modals/add-vehicle-modal/add-vehicle-modal.component';
import { GeneralComponent } from '@components/modals/add-vehicle-modal/general/general.component';
import { EngineComponent } from '@components/modals/add-vehicle-modal/engine/engine.component';
import { BodyComponent } from '@components/modals/add-vehicle-modal/body/body.component';

const materialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatDialogModule,
  MatStepperModule,
  MatSelectModule,
  MatRadioModule,
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
  declarations: [LoaderComponent, SidebarComponent, AddVehicleModalComponent, GeneralComponent, EngineComponent, BodyComponent ],
})
export class SharedModule {
  constructor(private matIconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    customSvgIcons.forEach(config => {
      this.matIconRegistry.addSvgIcon(config.name, this.sanitizer.bypassSecurityTrustResourceUrl(config.url));
    });
  }
}
