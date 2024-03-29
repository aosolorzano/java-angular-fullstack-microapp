import {createReducer, on} from '@ngrx/store';
import {User} from "../model/user";
import {AuthActions} from "./action.types";

export interface AuthState {
  user: User;
};

export const initialAuthState: AuthState = {
  user: undefined
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginAction, (state, action) => {
    return {
      user: action.user
    };
  }),
  on(AuthActions.logoutAction, (state, action) => {
    return initialAuthState
  })
);
