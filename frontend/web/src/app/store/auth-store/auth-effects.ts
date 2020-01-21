import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import {  of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AuthDataService } from '@services/data-integration/auth-data.service';
import {
  LoginFailAction,
  LoginSuccessAction,
  RegisterFailAction,
  RegisterSuccessAction
} from '@store/auth-store/auth-actions';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpStatusCodes } from '@shared/constants/http-status-codes';
import { ErrorMessages } from '@shared/constants/error-messages';
import * as AuthActions from '@store/auth-store/auth-actions';

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthDataService,
    private actions$: Actions,
    private router: Router,
  ) {}

  public loginEffect$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.LoginAction),
    switchMap(action => {
      return this.authService.login(action.payload.email, action.payload.password)
        .pipe(
          map(() =>  {
            this.router.navigate(['/app']);
            return LoginSuccessAction();
          }),
          catchError((err: HttpErrorResponse) => {
            const isUnauthorizedStatusCode = err.error.statusCode === HttpStatusCodes.Unauthorized;
            const error = isUnauthorizedStatusCode ? ErrorMessages.Unauthorized : ErrorMessages.GeneralServerError;

            return of(LoginFailAction({ payload: { error }}));
          }),
        );
    }),
  ));

  // @Effect()
  // public loginEffect$: Observable<Action> = this.actions$.pipe(
  //   ofType<LoginAction>(AuthActionsTypes.LOGIN),
  //   switchMap((action: LoginAction) => {
  //     return this.authService.login(action.payload.email, action.payload.password)
  //       .pipe(
  //         map(() =>  {
  //           this.router.navigate(['/app']);
  //           return new LoginSuccessAction();
  //         }),
  //         catchError((err: HttpErrorResponse) => {
  //           const isUnauthorizedStatusCode = err.error.statusCode === HttpStatusCodes.Unauthorized;
  //           const error = isUnauthorizedStatusCode ? ErrorMessages.Unauthorized : ErrorMessages.GeneralServerError;
  //
  //           return of(new LoginFailAction({ error }));
  //         }),
  //       );
  //   }),
  // );

  @Effect()
  public registerEffect$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.RegisterAction),
    switchMap(({ payload }) => {
      return this.authService.registerUser(payload.newUser)
        .pipe(
          map(() => {
            this.router.navigate(['/auth/login']);
            return RegisterSuccessAction();
          }),
          catchError((err: HttpErrorResponse) => {
            const isConflictStatusCode = err.error.statusCode === HttpStatusCodes.Conflict;
            const error = isConflictStatusCode ? ErrorMessages.UserAlreadyExists : ErrorMessages.GeneralServerError;

            return of(RegisterFailAction({ payload: { error }));
          }),
        );
    }),
  ));
}
