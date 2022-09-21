import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from './reducers/auth.reducers';
import {AuthStoreKeyEnum} from "../utils/store/store-keys.enum";

export const authFeatureSelector = createFeatureSelector<AuthState>(AuthStoreKeyEnum.authFeatureName);

export const isLoggedIn = createSelector(authFeatureSelector,
    authState => !!authState.user
);

export const getSessionToken = createSelector(authFeatureSelector,
  authState => authState.user?.token
);

export const getUserFullName = createSelector(authFeatureSelector,
  authState => authState.user?.name
);
