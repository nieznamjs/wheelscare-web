import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  public getFormControl(form: FormGroup, name: string): AbstractControl {
    return form.get(name);
  }
}
