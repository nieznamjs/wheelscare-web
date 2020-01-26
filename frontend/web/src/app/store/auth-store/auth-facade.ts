import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthState, RegisterUserBody } from '@interfaces';
import {
  selectInitPasswordResetError,
  selectInitPasswordResetSuccess,
  selectIsInitiatedPasswordReset,
  selectIsLogging, selectIsPasswordResetting,
  selectIsRegisteringUser,
  selectIsUserLogged,
  selectLoginError, selectPasswordResetError, selectPasswordResetSuccess, selectRegisteredSuccessfully,
  selectRegisterUserError,
} from './auth-selectors';
import { InitResetPasswordAction, LoginAction, RegisterUserAction } from './auth-actions';

@Injectable()
export class AuthFacade {
  public isUserLogged$ = this.store.select(selectIsUserLogged);
  public isLogging$ = this.store.select(selectIsLogging);
  public loginError$ = this.store.select(selectLoginError);

  public registeredSuccessfully = this.store.select(selectRegisteredSuccessfully);
  public isRegistering$ = this.store.select(selectIsRegisteringUser);
  public registerError$ = this.store.select(selectRegisterUserError);

  public isInitiatedPasswordReset$ = this.store.select(selectIsInitiatedPasswordReset);
  public initPasswordResetSuccess$ = this.store.select(selectInitPasswordResetSuccess);
  public initPasswordResetError$ = this.store.select(selectInitPasswordResetError);

  public isResettingPassword$ = this.store.select(selectIsPasswordResetting);
  public resetPasswordSuccess$ = this.store.select(selectPasswordResetSuccess);
  public resetPasswordError$ = this.store.select(selectPasswordResetError);

  constructor(private store: Store<AuthState>) {}

  public login(email: string, password: string): void {
    this.store.dispatch(LoginAction({ payload: { email, password }}));
  }

  public registerUser(newUser: RegisterUserBody): void {
    this.store.dispatch(RegisterUserAction({ payload: { newUser }}));
  }

  public initPasswordReset(email: string): void {
    this.store.dispatch(InitResetPasswordAction({ payload: { email }}));
  }
}
