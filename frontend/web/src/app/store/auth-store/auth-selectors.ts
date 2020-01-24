import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from '@interfaces';

export const getIsUserLogged = (state: AuthState) => state.login.isUserLogged;
export const getIsLogging = (state: AuthState) => state.login.isLoading;
export const getLoginError = (state: AuthState) => state.login.error;
export const getRegisteredSuccessfully = (state: AuthState) => state.registerUser.registeredSuccessfully;
export const getIsRegistering = (state: AuthState) => state.registerUser.isLoading;
export const getRegisterError = (state: AuthState) => state.registerUser.error;

export const authStateSelector = createFeatureSelector<AuthState>('auth');

export const selectIsLogging = createSelector(authStateSelector, getIsLogging);
export const selectLoginError = createSelector(authStateSelector, getLoginError);
export const selectIsUserLogged = createSelector(authStateSelector, getIsUserLogged);
export const selectRegisteredSuccessfully = createSelector(authStateSelector, getRegisteredSuccessfully);
export const selectIsRegisteringUser = createSelector(authStateSelector, getIsRegistering);
export const selectRegisterUserError = createSelector(authStateSelector, getRegisterError);
