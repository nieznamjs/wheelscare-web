import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthState, RegisterUserBody } from '@interfaces';
import {
  selectIsLogging,
  selectIsRegistering,
  selectIsUserLogged,
  selectLoginError,
  selectRegisterError,
} from './auth-selectors';
import { LoginAction, RegisterAction } from './auth-actions';

@Injectable()
export class AuthFacade {
  public isUserLogged$ = this.store.select(selectIsUserLogged);
  public isLogging$ = this.store.select(selectIsLogging);
  public loginError$ = this.store.select(selectLoginError);
  public isRegistering$ = this.store.select(selectIsRegistering);
  public registerError$ = this.store.select(selectRegisterError);

  constructor(private store: Store<AuthState>) {}

  public login(email: string, password: string): void {
    this.store.dispatch(new LoginAction({ email, password }));
  }

  public register(newUser: RegisterUserBody): void {
    this.store.dispatch(new RegisterAction({ newUser }));
  }
}
