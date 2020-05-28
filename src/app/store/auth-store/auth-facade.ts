import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthState } from '@interfaces';
import { IRegisterUserBody } from '@wheelscare/common';
import {
  ActivateUserAction,
  InitResetPasswordAction,
  LoginAction, LoginSuccessAction, LoginViaFacebookAction,
  LoginViaGoogleAction, LogoutAction,
  RegisterUserAction,
  ResetPasswordAction,
} from './auth-actions';
import {
  selectActivateUserError,
  selectActivateUserSuccess,
  selectInitPasswordResetError,
  selectInitPasswordResetSuccess, selectIsActivatingUser,
  selectIsInitiatedPasswordReset,
  selectIsLogging, selectIsPasswordResetting,
  selectIsRegisteringUser,
  selectIsUserLogged,
  selectLoginError,
  selectPasswordResetError,
  selectPasswordResetSuccess,
  selectRegisteredSuccessfully,
  selectRegisterUserError,
} from './auth-selectors';

@Injectable()
export class AuthFacade {
  public isUserLogged$ = this.store.select(selectIsUserLogged);
  public isLogging$ = this.store.select(selectIsLogging);
  public loginError$ = this.store.select(selectLoginError);

  public registeredSuccessfully$ = this.store.select(selectRegisteredSuccessfully);
  public isRegistering$ = this.store.select(selectIsRegisteringUser);
  public registerError$ = this.store.select(selectRegisterUserError);

  public isInitiatedPasswordReset$ = this.store.select(selectIsInitiatedPasswordReset);
  public initPasswordResetSuccess$ = this.store.select(selectInitPasswordResetSuccess);
  public initPasswordResetError$ = this.store.select(selectInitPasswordResetError);

  public isResettingPassword$ = this.store.select(selectIsPasswordResetting);
  public resetPasswordSuccess$ = this.store.select(selectPasswordResetSuccess);
  public resetPasswordError$ = this.store.select(selectPasswordResetError);

  public isActivatingUser$ = this.store.select(selectIsActivatingUser);
  public activateUserSuccess$ = this.store.select(selectActivateUserSuccess);
  public activateUserError$ = this.store.select(selectActivateUserError);

  constructor(private store: Store<AuthState>) {}

  public login(email: string, password: string): void {
    this.store.dispatch(LoginAction({ payload: { email, password }}));
  }

  public setUserLogged(): void {
    this.store.dispatch(LoginSuccessAction());
  }

  public logout(): void {
    this.store.dispatch(LogoutAction());
  }

  public loginUserViaGoogle(): void {
    this.store.dispatch(LoginViaGoogleAction());
  }

  public loginUserViaFacebook(): void {
    this.store.dispatch(LoginViaFacebookAction());
  }

  public registerUser(newUser: IRegisterUserBody): void {
    this.store.dispatch(RegisterUserAction({ payload: { newUser }}));
  }

  public initPasswordReset(email: string): void {
    this.store.dispatch(InitResetPasswordAction({ payload: { email }}));
  }

  public passwordReset(id: string, password: string, token: string): void {
    this.store.dispatch(ResetPasswordAction({ payload: { id, password, token }}));
  }

  public activateUser(userId: string, token: string): void {
    this.store.dispatch(ActivateUserAction({ payload: { userId, token }}));
  }
}
