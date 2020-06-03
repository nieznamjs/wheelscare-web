import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';

import { DeleteVehicleConfirmComponent } from '@components/modals/delete-vehicle-confirm/delete-vehicle-confirm.component';
import { AddVehicleModalComponent } from '@components/modals/add-vehicle-modal/add-vehicle-modal.component';

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

  public openAddVehicleModal(): MatDialogRef<AddVehicleModalComponent> {
    return this.open(AddVehicleModalComponent, { disableClose: true });
  }

  public openDeleteVehicleConfirmModal(options: MatDialogConfig): MatDialogRef<DeleteVehicleConfirmComponent> {
    return this.open<DeleteVehicleConfirmComponent>(DeleteVehicleConfirmComponent, options);
  }
}
