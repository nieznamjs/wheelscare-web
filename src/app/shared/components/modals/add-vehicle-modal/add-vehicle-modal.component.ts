import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'wcw-add-vehicle-modal',
  templateUrl: './add-vehicle-modal.component.html',
  styleUrls: ['./add-vehicle-modal.component.scss']
})
export class AddVehicleModalComponent implements OnInit {
  public generalForm: FormGroup;
  public engineForm: FormGroup;
  public bodyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddVehicleModalComponent>,
  ) {}

  public ngOnInit(): void {
    this.generalForm = this.createGeneralForm();
    this.engineForm = this.createEngineForm();
    this.bodyForm = this.createBodyForm();
  }

  public close(): void {
    this.dialogRef.close();
  }

  public save(): void {
    // TODO
  }

  private createGeneralForm(): FormGroup {
    return this.fb.group({
      name: [ null, Validators.required ],
      brand: [ null, Validators.required ],
      model: [ null, Validators.required ],
      vin: [ null, Validators.required ],
      type: [ null, Validators.required ],
      mileage: [ null, Validators.required ],
      productionYear: [ null, Validators.required ],
    });
  }

  private createEngineForm(): FormGroup {
    return this.fb.group({
      capacity: [ null, Validators.required ],
      power: [ null, Validators.required ],
      fuelType: [ null, Validators.required ],
      gearbox: [ null, Validators.required ],
      drive: [ null, Validators.required ],
    });
  }

  private createBodyForm(): FormGroup {
    return this.fb.group({
      color: [ null, Validators.required ],
      paintType: [ null, Validators.required ],
      seatsNumber: [ null, Validators.required ],
      doorsNumber: [ null, Validators.required ],
      isEnglishman: [ null, Validators.required ],
    });
  }
}
