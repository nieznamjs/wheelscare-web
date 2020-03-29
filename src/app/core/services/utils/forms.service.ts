import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  public getFormControl(form: FormGroup, name: string): AbstractControl {
    return form.get(name);
  }

  public disableFields(form: FormGroup, fields: string[]): void {
    fields.forEach((fieldName: string) => {
      this.getFormControl(form, fieldName).disable();
    });
  }

  public enableFields(form: FormGroup, fields: string[]): void {
    fields.forEach((fieldName: string) => {
      this.getFormControl(form, fieldName).enable();
    });
  }
}
