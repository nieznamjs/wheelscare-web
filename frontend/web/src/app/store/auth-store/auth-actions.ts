import { Action } from '@ngrx/store';

export enum AuthActionsTypes {
  LOGIN = '[WCW] Login',
  LOGIN_SUCCESS = '[WCW] Login Success',
  LOGIN_FAIL = '[WCW] Login Fail',
}

export class LoginAction implements Action {
  readonly type = AuthActionsTypes.LOGIN;

  constructor(public payload: { email: string, password: string }) {}
}

export class LoginSuccessAction implements Action {
  readonly type = AuthActionsTypes.LOGIN_SUCCESS;
}

export class LoginFailAction implements Action {
  readonly type = AuthActionsTypes.LOGIN_FAIL;

  constructor(public payload: { error: string }) {}
}
export type AuthActions =
  LoginAction
  | LoginSuccessAction
  | LoginFailAction;
