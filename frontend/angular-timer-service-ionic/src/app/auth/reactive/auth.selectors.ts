import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from './auth.reducers';
import {AuthStoreKeyEnum} from "../utils/store/store-keys.enum";

export const authStateSelector = createFeatureSelector<AuthState>(AuthStoreKeyEnum.authFeatureName);

export const  isUserLoggedIn = createSelector(
  authStateSelector,
  (state: AuthState) => !!state.user
);

export const isUserLoggedOut = createSelector(
  isUserLoggedIn,
  loggedIn => !loggedIn
);

export const getSessionToken = createSelector(
  authStateSelector,
  (state: AuthState) => state.user?.token
);

export const getUserFullName = createSelector(
  authStateSelector,
  (state: AuthState) => state.user?.name
);
