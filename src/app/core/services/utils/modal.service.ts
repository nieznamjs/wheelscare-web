import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';

import { DeleteVehicleConfirmComponent } from '@components/modals/delete-vehicle-confirm/delete-vehicle-confirm.component';
import { VehicleModalComponent } from '@components/modals/vehicle-modal/vehicle-modal.component';
import { InitVehicleTransferComponent } from '@shared/components/modals/init-vehicle-transfer/init-vehicle-transfer.component';
import { VehicleModalData } from '@interfaces';

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

  public openVehicleModal(data: VehicleModalData): MatDialogRef<VehicleModalComponent> {
    return this.open(VehicleModalComponent, { disableClose: true, panelClass: 'vehicle-modal', data });
  }

  public openDeleteVehicleConfirmModal(options: MatDialogConfig): MatDialogRef<DeleteVehicleConfirmComponent> {
    return this.open<DeleteVehicleConfirmComponent>(DeleteVehicleConfirmComponent, { ...options, maxWidth: 500 });
  }

  public openInitVehicleTransferModal(options: MatDialogConfig): MatDialogRef<InitVehicleTransferComponent> {
    return this.open<InitVehicleTransferComponent>(InitVehicleTransferComponent, { ...options, width: '400px' });
  }
}
