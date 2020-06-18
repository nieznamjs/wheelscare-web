import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ConfirmVehicleTransferInitComponent } from '@components/modals/confirm-vehicle-transfer-init/confirm-vehicle-transfer-init.component';
import { ConfirmVehicleTransferInitModalData } from '@interfaces';

@Injectable({
  providedIn: 'root'
})
export class ConfirmModalService {

  constructor(private dialog: MatDialog) { }

  public openConfirmVehicleTransferModal(data: ConfirmVehicleTransferInitModalData): MatDialogRef<ConfirmVehicleTransferInitComponent> {
    return this.dialog.open(ConfirmVehicleTransferInitComponent, { data, maxWidth: 500 });
  }
}
