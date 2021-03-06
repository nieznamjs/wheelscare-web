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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { LoaderComponent } from '@components/loader/loader.component';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { VehicleModalComponent } from '@components/modals/vehicle-modal/vehicle-modal.component';
import { SnackbarSuccessComponent } from '@components/snackbar-success/snackbar-success.component';
import { ErrorMessageComponent } from '@components/error-message/error-message.component';
import { VehicleModalBodyComponent } from '@components/modals/vehicle-modal/vehicle-modal-body/vehicle-modal-body.component';
import { VehicleModalEngineComponent } from '@components/modals/vehicle-modal/vehicle-modal-engine/vehicle-modal-engine.component';
import { VehicleModalGeneralComponent } from '@components/modals/vehicle-modal/vehicle-modal-general/vehicle-modal-general.component';
import { DeleteVehicleConfirmComponent } from '@components/modals/delete-vehicle-confirm/delete-vehicle-confirm.component';
import { InitVehicleTransferComponent } from '@components/modals/init-vehicle-transfer/init-vehicle-transfer.component';
import { ConfirmVehicleTransferInitComponent } from '@components/modals/confirm-vehicle-transfer-init/confirm-vehicle-transfer-init.component';
import { SnackbarErrorComponent } from '@components/snackbar-error/snackbar-error.component';
import { BrandLogoPathPipe } from './pipes/brand-logo-path.pipe';

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
  MatSnackBarModule,
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
    PerfectScrollbarModule,
  ],
  exports: [
    ...materialModules,
    CommonModule,
    ReactiveFormsModule,
    LoaderComponent,
    SidebarComponent,
    PerfectScrollbarModule,
    ErrorMessageComponent,
    BrandLogoPathPipe,
  ],
  declarations: [
    LoaderComponent,
    SidebarComponent,
    VehicleModalComponent,
    VehicleModalBodyComponent,
    VehicleModalEngineComponent,
    VehicleModalGeneralComponent,
    SnackbarSuccessComponent,
    ErrorMessageComponent,
    DeleteVehicleConfirmComponent,
    InitVehicleTransferComponent,
    ConfirmVehicleTransferInitComponent,
    SnackbarErrorComponent,
    BrandLogoPathPipe,
  ],
})
export class SharedModule {
  constructor(private matIconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    customSvgIcons.forEach(config => {
      this.matIconRegistry.addSvgIcon(config.name, this.sanitizer.bypassSecurityTrustResourceUrl(config.url));
    });
  }
}
