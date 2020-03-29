import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { FormsService } from '@services/utils/forms.service';

@Component({
  selector: 'wcw-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent {
  @Input() public formGroup: FormGroup;

  constructor(private formsService: FormsService) { }

  public getFormControl(name: string): AbstractControl {
    return this.formsService.getFormControl(this.formGroup, name);
  }
}
