import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormsService } from '@services/utils/forms.service';
import { AuthFacade } from '@store/auth-store';
import { PASSWORD_REQUIREMENT_REGEX_STRING } from '@shared/constants/regexes';

@Component({
  selector: 'wcw-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  public form: FormGroup;
  public isLoading$: Observable<boolean>;
  public error$: Observable<string>;
  public success$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private formsService: FormsService,
    private authFacade: AuthFacade,
  ) {}

  private createForm(): FormGroup {
    return this.fb.group({
      password: [ null, [ Validators.required, Validators.pattern(PASSWORD_REQUIREMENT_REGEX_STRING) ] ],
      confirmPassword: [ null, Validators.required ],
    });
  }

  public ngOnInit(): void {
    this.form = this.createForm();

    this.isLoading$ = this.authFacade.isResettingPassword$;
    this.error$ = this.authFacade.resetPasswordError$;
    this.success$ = this.authFacade.resetPasswordSuccess$;
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
