import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiErrors } from '@wheelscare/common';

import { AuthDataService } from '@services/data-integration/auth-data.service';
import { HttpStatusCodes, ErrorMessages } from '@constants';
import * as AuthActions from '@store/auth-store/auth-actions';
import { UsersDataService } from '@services/data-integration/users-data.service';
import { SocialAuthService } from '@services/data-integration/social-auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthDataService,
    private usersService: UsersDataService,
    private socialAuthService: SocialAuthService,
    private actions$: Actions,
    private router: Router,
  ) {}

  public loginEffect$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.LoginAction),
    switchMap(action => {
      return this.authService.login(action.payload.email, action.payload.password)
        .pipe(
          map(() =>  {
            this.router.navigate(['/dashboard']);
            return AuthActions.LoginSuccessAction();
          }),
          catchError((err: HttpErrorResponse) => {
            const isUnauthorizedStatusCode = err.error.statusCode === HttpStatusCodes.Unauthorized;
            const isUserNotActive = err.error.message === ApiErrors.UserIsNotActive;
            let error = ErrorMessages.GENERAL_SERVER_ERROR;

            if (isUnauthorizedStatusCode) {
              error = ErrorMessages.UNAUTHORIZED_USER;
            }

            if (isUserNotActive) {
              error = ErrorMessages.USER_IS_NOT_ACTIVE;
            }

            return of(AuthActions.LoginFailAction({ error }));
          }),
        );
    }),
  ));

  public loginViaGoogleEffect$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.LoginViaGoogleAction),
    switchMap(() => {
      return this.socialAuthService.loginViaGoogle()
        .pipe(
          map(() =>  {
            this.router.navigate(['/dashboard']);
            return AuthActions.LoginViaGoogleSuccessAction();
          }),
          catchError(() => {
            return of(AuthActions.LoginViaGoogleFailAction({ error: ErrorMessages.GENERAL_SERVER_ERROR }));
          }),
        );
    }),
  ));

  public loginViaFacebookEffect$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.LoginViaFacebookAction),
    switchMap(() => {
      return this.socialAuthService.loginViaFacebook()
        .pipe(
          map(() =>  {
            this.router.navigate(['/dashboard']);
            return AuthActions.LoginViaFacebookSuccessAction();
          }),
          catchError(() => {
            return of(AuthActions.LoginViaFacebookFailAction({ error: ErrorMessages.GENERAL_SERVER_ERROR }));
          }),
        );
    }),
  ));

  public registerUserEffect$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.RegisterUserAction),
    switchMap(({ payload }) => {
      return this.authService.registerUser(payload.newUser)
        .pipe(
          map(() => AuthActions.RegisterUserSuccessAction()),
          catchError((err: HttpErrorResponse) => {
            const isConflictStatusCode = err.error.statusCode === HttpStatusCodes.Conflict;
            const error = isConflictStatusCode ? ErrorMessages.USER_ALREADY_EXISTS : ErrorMessages.GENERAL_SERVER_ERROR;

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
          map(() => AuthActions.InitResetPasswordSuccessAction()),
          catchError(() => {
            return of(AuthActions.InitResetPasswordFailAction({ error: ErrorMessages.GENERAL_SERVER_ERROR }));
          }),
        );
    }),
  ));

  public passwordReset = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.ResetPasswordAction),
    switchMap(({ payload }) => {
      return this.usersService.passwordReset(payload.id, payload.password, payload.token)
        .pipe(
          map(() => AuthActions.ResetPasswordSuccessAction()),
          catchError(() => {
            return of(AuthActions.ResetPasswordFailAction({ error: ErrorMessages.GENERAL_SERVER_ERROR }));
          }),
        );
    }),
  ));

  public activateUser = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.ActivateUserAction),
    switchMap(({ payload }) => {
      return this.usersService.activateUser(payload.userId, payload.token).pipe(
        map(() => AuthActions.ActivateUserSuccessAction()),
        catchError(() => {
          return of (AuthActions.ActivateUserFailAction({ error: ErrorMessages.CAN_NOT_ACTIVATE_USER }));
        }),
      );
    }),
  ));
}
