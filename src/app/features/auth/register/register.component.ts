import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { FormsService } from '@services/utils/forms.service';
import { PASSWORD_REQUIREMENT_REGEX_STRING } from '@shared/constants/regexes';
import { AuthFacade } from '@store/auth-store';

@Component({
  selector: 'wcw-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public isLoading$: Observable<boolean>;
  public registerError$: Observable<string>;
  public registeredSuccessfully$: Observable<boolean>;
  public hideFirstPassword = true;
  public hideSecondPassword = true;

  constructor(
    private fb: FormBuilder,
    private formsService: FormsService,
    private authFacade: AuthFacade,
  ) {}

  private createForm(): FormGroup {
    return this.fb.group({
      confirmPassword: [ null, Validators.required ],
      email: [ null, [ Validators.required, Validators.email ] ],
      password: [ null, [ Validators.required, Validators.pattern(PASSWORD_REQUIREMENT_REGEX_STRING) ] ],
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

  public loginViaGoogle(): void {
    this.authFacade.loginUserViaGoogle();
  }

  public loginViaFacebook(): void {
    this.authFacade.loginUserViaFacebook();
  }

  public onSubmit(): void {
    if (this.form.invalid) { return; }

    const { email, password } = this.form.value;

    this.authFacade.registerUser({ email, password });
  }
}
