import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmVehicleTransferComponent } from './confirm-vehicle-transfer.component';

const routes: Routes = [
  { path: '', component: ConfirmVehicleTransferComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmVehicleTransferRoutingModule{ }
