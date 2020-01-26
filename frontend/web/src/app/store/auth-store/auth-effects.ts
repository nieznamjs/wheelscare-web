import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, map, switchMap } from 'rxjs/operators';

import { AuthDataService } from '@services/data-integration/auth-data.service';
import { HttpStatusCodes } from '@shared/constants/http-status-codes';
import { ErrorMessages } from '@shared/constants/error-messages';
import * as AuthActions from '@store/auth-store/auth-actions';
import { UsersDataService } from '@services/data-integration/users-data.service';

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthDataService,
    private usersService: UsersDataService,
    private actions$: Actions,
    private router: Router,
  ) {}

  public loginEffect$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.LoginAction),
    delay(2000),
    switchMap(action => {
      return this.authService.login(action.payload.email, action.payload.password)
        .pipe(
          map(() =>  {
            this.router.navigate(['/app']);
            return AuthActions.LoginSuccessAction();
          }),
          catchError((err: HttpErrorResponse) => {
            const isUnauthorizedStatusCode = err.error.statusCode === HttpStatusCodes.Unauthorized;
            const error = isUnauthorizedStatusCode ? ErrorMessages.Unauthorized : ErrorMessages.GeneralServerError;

            return of(AuthActions.LoginFailAction({ error }));
          }),
        );
    }),
  ));

  public registerUserEffect$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.RegisterUserAction),
    switchMap(({ payload }) => {
      return this.authService.registerUser(payload.newUser)
        .pipe(
          map(() => {
            this.router.navigate(['/auth/login']);
            return AuthActions.RegisterUserSuccessAction();
          }),
          catchError((err: HttpErrorResponse) => {
            const isConflictStatusCode = err.error.statusCode === HttpStatusCodes.Conflict;
            const error = isConflictStatusCode ? ErrorMessages.UserAlreadyExists : ErrorMessages.GeneralServerError;

            return of(AuthActions.RegisterUserFailAction({ error }));
          }),
        );
    }),
  ));

  public initPasswordReset$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.InitResetPasswordAction),
    switchMap(({ payload }) => {
      return this.usersService.initPasswordReset(payload.email)
        .pipe(
          map(() => AuthActions.InitResetPasswordSuccessAction),
          catchError((err: HttpErrorResponse) => {
            return of(AuthActions.InitResetPasswordFailAction({ error: ErrorMessages.GeneralServerError }));
          }),
        );
    }),
  ));
}
