import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthState } from '@interfaces';
import {
  selectIsLogging,
  selectIsUserLogged,
  selectLoginError,
} from './auth-selectors';
import { LoginAction } from './auth-actions';

@Injectable()
export class AuthFacade {
  public isUserLogged$ = this.store.select(selectIsUserLogged);
  public isLogging$ = this.store.select(selectIsLogging);
  public loginError$ = this.store.select(selectLoginError);

  constructor(private store: Store<AuthState>) {}

  public login(email: string, password: string): void {
    this.store.dispatch(new LoginAction({ email, password }));
  }
}
