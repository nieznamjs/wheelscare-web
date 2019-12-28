import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from '@interfaces';

export const getIsUserLogged = (state: AuthState) => state.login.isUserLogged;
export const getIsLogging = (state: AuthState) => state.login.isLoading;
export const getLoginError = (state: AuthState) => state.login.error;

export const authStateSelector = createFeatureSelector<AuthState>('auth');

export const selectIsLogging = createSelector(authStateSelector, getIsLogging);
export const selectLoginError = createSelector(authStateSelector, getLoginError);
export const selectIsUserLogged = createSelector(authStateSelector, getIsUserLogged);
