import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from '@interfaces';

export const getIsUserLogged = (state: AuthState) => state.login.isUserLogged;
export const getIsLogging = (state: AuthState) => state.login.isLoading;
export const getLoginError = (state: AuthState) => state.login.error;
export const getIsRegistering = (state: AuthState) => state.register.isLoading;
export const getRegisterError = (state: AuthState) => state.register.error;

export const authStateSelector = createFeatureSelector<AuthState>('auth');

export const selectIsLogging = createSelector(authStateSelector, getIsLogging);
export const selectLoginError = createSelector(authStateSelector, getLoginError);
export const selectIsUserLogged = createSelector(authStateSelector, getIsUserLogged);
export const selectIsRegistering = createSelector(authStateSelector, getIsRegistering);
export const selectRegisterError = createSelector(authStateSelector, getRegisterError);
