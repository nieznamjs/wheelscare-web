import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormsService } from '@services/utils/forms.service';
import { AuthFacade } from '@store/auth-store';

@Component({
  selector: 'wcw-init-reset-password',
  templateUrl: './init-reset-password.component.html',
  styleUrls: ['./init-reset-password.component.scss']
})
export class InitResetPasswordComponent implements OnInit {
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
      email: [ null, [ Validators.required, Validators.email ] ],
    });
  }

  public ngOnInit(): void {
    this.form = this.createForm();

    this.isLoading$ = this.authFacade.isInitiatedPasswordReset$;
    this.error$ = this.authFacade.initPasswordResetError$;
    this.success$ = this.authFacade.initPasswordResetSuccess$;
  }

  public getFormControl(name: string): AbstractControl {
    return this.formsService.getFormControl(this.form, name);
  }

  public onSubmit(): void {
    if (this.form.invalid) { return; }

    const { email } = this.form.value;

    this.authFacade.initPasswordReset(email);
  }
}
