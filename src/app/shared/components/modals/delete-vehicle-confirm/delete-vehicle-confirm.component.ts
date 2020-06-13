import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DeleteVehicleConfirmModalData } from '@shared/interfaces/delete-vehicle-confirm-modal-data.interface';
import { VehiclesDataService } from '@services/data-integration/vehicles-data.service';
import { SnackbarService } from '@services/utils/snackbar.service';
import { SnackbarMessages } from '@constants';

@Component({
  selector: 'wcw-delete-vehicle-confirm',
  templateUrl: './delete-vehicle-confirm.component.html',
  styleUrls: ['./delete-vehicle-confirm.component.scss']
})
export class DeleteVehicleConfirmComponent implements OnDestroy {

  public loading = false;
  public errors: string[];
  private destroy$ = new ReplaySubject(1);

  constructor(
    private dialogRef: MatDialogRef<DeleteVehicleConfirmComponent>,
    private vehiclesDataService: VehiclesDataService,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: DeleteVehicleConfirmModalData,
  ) { }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public deleteVehicle(): void {
    this.vehiclesDataService.deleteVehicle(this.data.vehicle.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.loading = response.loading;
        this.errors = response.errors;
        this.dialogRef.disableClose = !response.loading;

        if (response.data) {
          this.snackbarService.showSuccess(SnackbarMessages.VehicleDeletedSuccessfully);
          this.close();
        }
    });
  }

  public close(): void {
    this.dialogRef.close();
  }
}
