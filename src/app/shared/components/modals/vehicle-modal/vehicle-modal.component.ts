import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IVehicleBrands, VALID_VIN_REGEX, Vehicle } from '@wheelscare/common';
import { VehiclesDataService } from '@services/data-integration/vehicles-data.service';
import { SnackbarService } from '@services/utils/snackbar.service';
import { SnackbarMessages } from '@constants';
import { VehicleModalData } from '@interfaces';

@Component({
  selector: 'wcw-vehicle-modal',
  templateUrl: './vehicle-modal.component.html',
  styleUrls: [ './vehicle-modal.component.scss' ],
})
export class VehicleModalComponent implements OnInit, OnDestroy {
  public generalForm: FormGroup;
  public engineForm: FormGroup;
  public bodyForm: FormGroup;
  public brands$: Observable<IVehicleBrands>;
  public currYear = new Date().getFullYear();
  public isLoading: boolean;
  public errors: string[];

  private destroy$ = new ReplaySubject<void>();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<VehicleModalComponent>,
    private vehiclesService: VehiclesDataService,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) private data: VehicleModalData,
  ) {
  }

  public ngOnInit(): void {
    this.generalForm = this.createGeneralForm();
    this.engineForm = this.createEngineForm();
    this.bodyForm = this.createBodyForm();

    this.patchForms();

    this.brands$ = this.vehiclesService.getBrands();
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public close(): void {
    this.dialogRef.close();
  }

  public save(): void {
    const vehicle: Vehicle = {
      ...this.generalForm.value,
      ...this.engineForm.value,
      ...this.bodyForm.value,
    };

    if (this.data?.vehicle) {
      this.vehiclesService.updateVehicle(vehicle)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          this.isLoading = result.loading;
          this.errors = result.errors;

          if (result.data) {
            this.dialogRef.close();
            this.snackbarService.showSuccess(SnackbarMessages.VehicleUpdatedSuccessfully);
          }
        });

      return;
    }

    this.vehiclesService.createNewVehicle(vehicle)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.isLoading = result.loading;
        this.errors = result.errors;

        if (result.data) {
          this.dialogRef.close();
          this.snackbarService.showSuccess(SnackbarMessages.VehicleAddedSuccessfully);
        }
      });
  }

  private patchForms(): void {
    const vehicleData = this.data?.vehicle;

    if (!vehicleData) {
      return;
    }

    this.generalForm.patchValue(vehicleData);
    this.engineForm.patchValue(vehicleData);
    this.bodyForm.patchValue(vehicleData);
  }

  private createGeneralForm(): FormGroup {
    return this.fb.group({
      name: [ null, Validators.required ],
      brand: [ null, Validators.required ],
      vehicleModel: [ null, Validators.required ],
      vin: [ null, [ Validators.required, Validators.pattern(VALID_VIN_REGEX) ] ],
      type: [ null, Validators.required ],
      mileage: [ null, [
        Validators.required,
        Validators.min(1),
        Validators.max(5000000),
      ] ],
      yearOfProduction: [ null, [
        Validators.required,
        Validators.min(1900),
        Validators.max(this.currYear),
      ] ],
    });
  }

  private createEngineForm(): FormGroup {
    return this.fb.group({
      engineCapacity: [ null, [ Validators.required, Validators.min(1), Validators.max(99999) ] ],
      enginePower: [ null, [ Validators.required, Validators.min(1), Validators.max(9999) ] ],
      fuelType: [ null, Validators.required ],
      transmissionType: [ null, Validators.required ],
      driveType: [ null, Validators.required ],
    });
  }

  private createBodyForm(): FormGroup {
    return this.fb.group({
      paintColor: [ null, Validators.required ],
      paintType: [ null, Validators.required ],
      seatsNumber: [ null, Validators.required ],
      doorsNumber: [ null, Validators.required ],
      hasLeftSteeringWheelPosition: [ false, Validators.required ],
    });
  }
}
