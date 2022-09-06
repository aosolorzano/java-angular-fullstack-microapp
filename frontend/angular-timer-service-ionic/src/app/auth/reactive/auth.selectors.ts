import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from './reducers';
import {AuthStoreKeyEnum} from "../utils/security/store-keys.enum";

export const getAuthState = createFeatureSelector<AuthState>(AuthStoreKeyEnum.authFeatureName);

export const isLoggedIn = createSelector(getAuthState,
    authState => !!authState.user
);

export const getSessionToken = createSelector(getAuthState,
  authState => authState.user?.token
);

export const getUserFullName = createSelector(getAuthState,
  authState => authState.user?.name
);
