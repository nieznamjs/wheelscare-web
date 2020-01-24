import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthState, RegisterUserBody } from '@interfaces';
import {
  selectIsLogging,
  selectIsRegisteringUser,
  selectIsUserLogged,
  selectLoginError, selectRegisteredSuccessfully,
  selectRegisterUserError,
} from './auth-selectors';
import { LoginAction, RegisterUserAction } from './auth-actions';

@Injectable()
export class AuthFacade {
  public isUserLogged$ = this.store.select(selectIsUserLogged);
  public isLogging$ = this.store.select(selectIsLogging);
  public loginError$ = this.store.select(selectLoginError);
  public registeredSuccessfully = this.store.select(selectRegisteredSuccessfully);
  public isRegistering$ = this.store.select(selectIsRegisteringUser);
  public registerError$ = this.store.select(selectRegisterUserError);

  constructor(private store: Store<AuthState>) {}

  public login(email: string, password: string): void {
    this.store.dispatch(LoginAction({ payload: { email, password }}));
  }

  public register(newUser: RegisterUserBody): void {
    this.store.dispatch(RegisterUserAction({ payload: { newUser }}));
  }
}
