import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { IVehicleBrands, VALID_VIN_REGEX, Vehicle } from '@wheelscare/common';
import { VehiclesDataService } from '@services/data-integration/vehicles-data.service';

@Component({
  selector: 'wcw-add-vehicle-modal',
  templateUrl: './add-vehicle-modal.component.html',
  styleUrls: ['./add-vehicle-modal.component.scss']
})
export class AddVehicleModalComponent implements OnInit {
  public generalForm: FormGroup;
  public engineForm: FormGroup;
  public bodyForm: FormGroup;
  public brands$: Observable<IVehicleBrands>;
  public currYear = new Date().getFullYear();
  public isLoading: boolean;
  public createVehicleError: string;
  public error: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddVehicleModalComponent>,
    private vehiclesService: VehiclesDataService,
  ) {}

  public ngOnInit(): void {
    this.generalForm = this.createGeneralForm();
    this.engineForm = this.createEngineForm();
    this.bodyForm = this.createBodyForm();

    this.brands$ = this.vehiclesService.getBrands();
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

    this.vehiclesService.createNewVehicle(vehicle).subscribe(result => {
      this.isLoading = result.loading;
      this.error = result.error;

      if (result.data) {
        this.dialogRef.close();
      }
    });
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
      ]],
      yearOfProduction: [ null, [
        Validators.required,
        Validators.min(1900),
        Validators.max(this.currYear),
      ]],
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
