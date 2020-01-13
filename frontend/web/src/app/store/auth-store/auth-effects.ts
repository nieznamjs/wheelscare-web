import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AuthService } from '@services/data-integration/auth.service';
import { AuthActionsTypes, LoginAction, LoginFailAction, LoginSuccessAction } from '@store/auth-store/auth-actions';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpStatusCodes } from '@shared/constants/http-status-codes';
import { ErrorMessages } from '@shared/constants/error-messages';

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router,
  ) {}

  @Effect()
  public loginEffect$: Observable<Action> = this.actions$.pipe(
    ofType<LoginAction>(AuthActionsTypes.LOGIN),
    switchMap((action: LoginAction) => {
      return this.authService.login(action.payload.email, action.payload.password)
        .pipe(
          map(() =>  {
            this.router.navigate(['/app']);
            return new LoginSuccessAction();
          }),
          catchError((err: HttpErrorResponse) => {
            const isUnauthorizedStatusCode = err.error.statusCode === HttpStatusCodes.Unauthorized;
            const error = isUnauthorizedStatusCode ? ErrorMessages.Unauthorized : ErrorMessages.GeneralServerError;

            return of(new LoginFailAction({ error }));
          }),
        );
    }),
  );
}
