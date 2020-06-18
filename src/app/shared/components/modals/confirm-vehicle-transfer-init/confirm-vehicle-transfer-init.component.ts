import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ConfirmVehicleTransferInitModalData } from '@interfaces';
import { VehiclesDataService } from '@services/data-integration/vehicles-data.service';
import { SnackbarService } from '@services/utils/snackbar.service';
import { SnackbarMessages } from '@constants';

@Component({
  selector: 'wcw-confirm-vehicle-transfer-init',
  templateUrl: './confirm-vehicle-transfer-init.component.html',
  styleUrls: ['./confirm-vehicle-transfer-init.component.scss']
})
export class ConfirmVehicleTransferInitComponent implements OnDestroy {

  private destroy$ = new ReplaySubject<void>(1);

  public loading = false;
  public errors: string[];

  constructor(
    private dialogRef: MatDialogRef<ConfirmVehicleTransferInitComponent>,
    private vehiclesDataService: VehiclesDataService,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmVehicleTransferInitModalData,
  ) { }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public close(): void {
    this.dialogRef.close();
  }

  public initTransfer(): void {
    this.vehiclesDataService.initVehicleTransfer(this.data.body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.loading = response.loading;
        this.errors = response.errors;

        if (response.data) {
          this.snackbarService.showSuccess(SnackbarMessages.VehicleTransferInitializedSuccessfully);
          this.dialogRef.close(true);
        }
      });
  }
}
