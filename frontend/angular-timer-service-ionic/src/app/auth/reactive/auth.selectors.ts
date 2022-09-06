import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from './reducers';

export const getAuthState = createFeatureSelector<AuthState>("auth");

export const isLoggedIn = createSelector(getAuthState,
    authState => !!authState.user
);

export const getSessionToken = createSelector(getAuthState,
  authState => authState.user?.token
);

export const getUserFullName = createSelector(getAuthState,
  authState => authState.user?.name
);
