import { Action } from '@ngrx/store';

export enum AuthActionsTypes {
  LOGIN = '[WCA] Login',
  LOGIN_SUCCESS = '[WCA] Login Success',
  LOGIN_FAIL = '[WCA] Login Fail',
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
