import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { FormsService } from '@services/utils/forms.service';

@Component({
  selector: 'wcw-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  @Input() public formGroup: FormGroup;
  @Output() public saved = new EventEmitter<void>();

  constructor(private formsService: FormsService) { }

  public getFormControl(name: string): AbstractControl {
    return this.formsService.getFormControl(this.formGroup, name);
  }

  public save(): void {
    if (this.formGroup.invalid) { return; }

    this.saved.emit();
  }
}
