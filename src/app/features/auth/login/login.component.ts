import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { FormsService } from '@services/utils/forms.service';
import { AuthFacade } from '@store/auth-store';
import { USER_PASSWORD_REGEX } from '@wheelscare/common';

@Component({
  selector: 'wcw-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public isLoading$: Observable<boolean>;
  public loginError$: Observable<string>;
  public hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private formsService: FormsService,
    private authFacade: AuthFacade,
  ) {}

  private createForm(): FormGroup {
    return this.fb.group({
      email: [ null, [ Validators.required, Validators.email ] ],
      password: [ null, [ Validators.required, Validators.pattern(USER_PASSWORD_REGEX) ] ],
    });
  }

  public ngOnInit(): void {
    this.form = this.createForm();

    this.isLoading$ = this.authFacade.isLogging$;
    this.loginError$ = this.authFacade.loginError$;
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

    this.authFacade.login(email, password);
  }
}
