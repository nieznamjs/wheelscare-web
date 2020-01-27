import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { PASSWORD_REQUIREMENT_REGEX_STRING } from '@shared/constants/regexes';
import { FormsService } from '@services/utils/forms.service';
import { AuthFacade } from '@store/auth-store';

@Component({
  selector: 'wcw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
      password: [ null, [ Validators.required, Validators.pattern(PASSWORD_REQUIREMENT_REGEX_STRING) ] ],
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

  public onSubmit(): void {
    if (this.form.invalid) { return; }

    const { email, password } = this.form.value;

    this.authFacade.login(email, password);
  }
}
