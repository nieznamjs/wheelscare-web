import { NgModule } from '@angular/core';

import { ConfirmVehicleTransferComponent } from './confirm-vehicle-transfer.component';
import { ConfirmVehicleTransferRoutingModule } from './confirm-vehicle-transfer-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ConfirmVehicleTransferComponent],
  imports: [
    SharedModule,
    ConfirmVehicleTransferRoutingModule,
  ],
})
export class ConfirmVehicleTransferModule { }
