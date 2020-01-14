import { Action } from '@ngrx/store';
import { RegisterUserBody } from '@interfaces';

export enum AuthActionsTypes {
  LOGIN = '[WCW] Login',
  LOGIN_SUCCESS = '[WCW] Login Success',
  LOGIN_FAIL = '[WCW] Login Fail',
  REGISTER = '[WCW] Register',
  REGISTER_SUCCESS = '[WCW] Register Success',
  REGISTER_FAIL = '[WCW] Register Fail',
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

export class RegisterAction implements Action {
  readonly type = AuthActionsTypes.REGISTER;

  constructor(public payload: { newUser: RegisterUserBody }) {}
}

export class RegisterSuccessAction implements Action {
  readonly type = AuthActionsTypes.REGISTER_SUCCESS;
}

export class RegisterFailAction implements Action {
  readonly type = AuthActionsTypes.REGISTER_FAIL;

  constructor(public payload: { error: string }) {}
}

export type AuthActions =
  LoginAction
  | LoginSuccessAction
  | LoginFailAction
  | RegisterAction
  | RegisterSuccessAction
  | RegisterFailAction;
