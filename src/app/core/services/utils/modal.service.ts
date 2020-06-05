import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';

import { DeleteVehicleConfirmComponent } from '@components/modals/delete-vehicle-confirm/delete-vehicle-confirm.component';
import { VehicleModalComponent } from '@components/modals/vehicle-modal/vehicle-modal.component';
import { Vehicle } from '@wheelscare/common';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(
    private dialog: MatDialog,
  ) { }

  private open<T>(component: ComponentType<T>, options?: MatDialogConfig): MatDialogRef<T> {
    return this.dialog.open(component, options);
  }

  public openVehicleModal(vehicle?: Vehicle): MatDialogRef<VehicleModalComponent> {
    return this.open(VehicleModalComponent, { disableClose: true, data: { vehicle } });
  }

  public openDeleteVehicleConfirmModal(options: MatDialogConfig): MatDialogRef<DeleteVehicleConfirmComponent> {
    return this.open<DeleteVehicleConfirmComponent>(DeleteVehicleConfirmComponent, options);
  }
}
