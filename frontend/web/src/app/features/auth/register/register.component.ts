import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { PASSWORD_REQUIREMENT_REGEX_STRING } from '@shared/constants/regexes';
import { FormsService } from '@services/utils/forms.service';
import { AuthFacade } from '@store/auth-store';

@Component({
  selector: 'wcw-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public isLoading$: Observable<boolean>;
  public registerError$: Observable<string>;
  public registeredSuccessfully$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private formsService: FormsService,
    private authFacade: AuthFacade,
  ) {}

  private createForm(): FormGroup {
    return this.fb.group({
      email: [ null, [ Validators.required, Validators.email ] ],
      password: [ null, [ Validators.required, Validators.pattern(PASSWORD_REQUIREMENT_REGEX_STRING) ] ],
      confirmPassword: [ null, Validators.required ],
    });
  }

  public ngOnInit(): void {
    this.form = this.createForm();

    this.isLoading$ = this.authFacade.isRegistering$;
    this.registerError$ = this.authFacade.registerError$;
    this.registeredSuccessfully$ = this.authFacade.registeredSuccessfully$;
  }

  public getFormControl(name: string): AbstractControl {
    return this.formsService.getFormControl(this.form, name);
  }

  public onSubmit(): void {
    if (this.form.invalid) { return; }

    const { email, password } = this.form.value;

    this.authFacade.registerUser({ email, password });
  }
}
