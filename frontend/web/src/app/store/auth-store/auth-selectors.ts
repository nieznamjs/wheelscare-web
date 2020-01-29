import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from '@interfaces';

export const getIsUserLogged = (state: AuthState) => state.login.isUserLogged;
export const getIsLogging = (state: AuthState) => state.login.isLoading;
export const getLoginError = (state: AuthState) => state.login.error;
export const getRegisteredSuccessfully = (state: AuthState) => state.registerUser.isSuccess;
export const getIsRegistering = (state: AuthState) => state.registerUser.isLoading;
export const getRegisterError = (state: AuthState) => state.registerUser.error;
export const getIsInitiatedPasswordReset = (state: AuthState) => state.initPasswordReset.isLoading;
export const getInitPasswordResetSuccess = (state: AuthState) => state.initPasswordReset.isSuccess;
export const getInitPasswordResetError = (state: AuthState) => state.initPasswordReset.error;
export const getIsPasswordResetting = (state: AuthState) => state.passwordReset.isLoading;
export const getPasswordResetSuccess = (state: AuthState) => state.passwordReset.isSuccess;
export const getPasswordResetError = (state: AuthState) => state.passwordReset.error;
export const getIsActivatingUser = (state: AuthState) => state.activateUser.isLoading;
export const getActivateUserSuccess = (state: AuthState) => state.activateUser.isSuccess;
export const getActivateUserError = (state: AuthState) => state.activateUser.error;

export const authStateSelector = createFeatureSelector<AuthState>('auth');

export const selectIsLogging = createSelector(authStateSelector, getIsLogging);
export const selectLoginError = createSelector(authStateSelector, getLoginError);
export const selectIsUserLogged = createSelector(authStateSelector, getIsUserLogged);
export const selectRegisteredSuccessfully = createSelector(authStateSelector, getRegisteredSuccessfully);
export const selectIsRegisteringUser = createSelector(authStateSelector, getIsRegistering);
export const selectRegisterUserError = createSelector(authStateSelector, getRegisterError);
export const selectIsInitiatedPasswordReset = createSelector(authStateSelector, getIsInitiatedPasswordReset);
export const selectInitPasswordResetSuccess = createSelector(authStateSelector, getInitPasswordResetSuccess);
export const selectInitPasswordResetError = createSelector(authStateSelector, getInitPasswordResetError);
export const selectIsPasswordResetting = createSelector(authStateSelector, getIsPasswordResetting);
export const selectPasswordResetSuccess = createSelector(authStateSelector, getPasswordResetSuccess);
export const selectPasswordResetError = createSelector(authStateSelector, getPasswordResetError);
export const selectIsActivatingUser = createSelector(authStateSelector, getIsActivatingUser);
export const selectActivateUserSuccess = createSelector(authStateSelector, getActivateUserSuccess);
export const selectActivateUserError = createSelector(authStateSelector, getActivateUserError);
