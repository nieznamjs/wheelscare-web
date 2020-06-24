import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';

import { IVehicleBrands, VehicleTypes, IVehicleModel } from '@wheelscare/common';
import { FormsService } from '@services/utils/forms.service';
import { VehiclesTypesLabels } from '@constants';
import { getSelectOptions } from '@helpers';

@Component({
  selector: 'wcw-vehicle-modal-general',
  templateUrl: './vehicle-modal-general.component.html',
  styleUrls: ['./vehicle-modal-general.component.scss'],
})
export class VehicleModalGeneralComponent implements OnInit {
  @Input() public formGroup: FormGroup;
  @Input() public brands: IVehicleBrands;
  @Input() public currYear: number;

  public models: { [key: string]: IVehicleModel };
  public generations: string[];
  public readonly vehicleTypes = getSelectOptions(VehicleTypes, VehiclesTypesLabels);

  constructor(
    private formsService: FormsService,
  ) { }

  public ngOnInit(): void {
    if (this.formGroup.get('brand').value) {
      this.brandSelected();
    }

    if (this.formGroup.get('vehicleModel').value) {
      this.modelSelected();
    }
  }

  public getFormControl(name: string): AbstractControl {
    return this.formsService.getFormControl(this.formGroup, name);
  }

  public brandSelected(): void {
    this.models = this.brands[this.formGroup.get('brand').value].models;
  }

  public modelSelected(): void {
    this.generations = this.models[this.formGroup.get('vehicleModel').value].generations;

    const generationControl = this.formGroup.get('generation');

    if (this.generations?.length !== 0) {
      generationControl.setValidators([ Validators.required ]);
      generationControl.updateValueAndValidity();
      return;
    }

    generationControl.clearValidators();
    generationControl.updateValueAndValidity();
  }
}
