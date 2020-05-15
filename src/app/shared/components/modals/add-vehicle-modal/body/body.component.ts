import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { FormsService } from '@services/utils/forms.service';
import { VehiclesDataService } from '@services/data-integration/vehicles-data.service';

@Component({
  selector: 'wcw-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  @Input() public formGroup: FormGroup;
  @Output() public saved = new EventEmitter<void>();

  public readonly paintColors = this.vehiclesService.getPaintColorsSelectOptions();
  public readonly paintTypes = this.vehiclesService.getPaintTypesSelectOptions();
  public readonly doorsNumber = this.vehiclesService.getDoorsNumberSelectOptions();
  public readonly seatsNumber = this.vehiclesService.getSeatsNumberSelectOptions();

  constructor(
    private formsService: FormsService,
    private vehiclesService: VehiclesDataService,
  ) { }

  public getFormControl(name: string): AbstractControl {
    return this.formsService.getFormControl(this.formGroup, name);
  }

  public save(): void {
    if (this.formGroup.invalid) { return; }

    this.saved.emit();
  }
}
