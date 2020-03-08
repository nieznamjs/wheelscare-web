import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { FormsService } from '@services/utils/forms.service';

@Component({
  selector: 'wcw-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.scss']
})
export class EngineComponent {

  @Input() public formGroup: FormGroup;

  constructor(private formsService: FormsService) { }

  public getFormControl(name: string): AbstractControl {
    return this.formsService.getFormControl(this.formGroup, name);
  }
}
