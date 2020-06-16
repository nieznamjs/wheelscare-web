import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReplaySubject } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { InitVehicleTransferModalData } from '@interfaces';
import { ConfirmModalService } from '@services/utils/confirm-modal.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'wcw-init-vehicle-transfer',
  templateUrl: './init-vehicle-transfer.component.html',
  styleUrls: ['./init-vehicle-transfer.component.scss']
})
export class InitVehicleTransferComponent implements OnInit, OnDestroy {

  private destroy$ = new ReplaySubject<void>(1);
  public form: FormGroup;

  get targetUserEmail(): AbstractControl {
    return this.form.get('targetUserEmail');
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<InitVehicleTransferComponent>,
    private confirmModalService: ConfirmModalService,
    @Inject(MAT_DIALOG_DATA) public data: InitVehicleTransferModalData,
  ) { }

  public ngOnInit(): void {
    this.form = this.createForm();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public close(): void {
    this.dialogRef.close();
  }

  public initTransfer(): void {
    if (this.form.invalid) {
      return;
    }

    const body = this.form.value;

    this.confirmModalService.openConfirmVehicleTransferModal({ body, vehicle: this.data.vehicle }).afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.dialogRef.close();
        }
      });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      vehicleId: this.data.vehicle.id,
      targetUserEmail: [ null, [ Validators.required, Validators.email ] ],
    });
  }
}
