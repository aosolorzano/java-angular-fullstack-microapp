import {createReducer, on} from '@ngrx/store';
import {User} from "../../model/user";
import {AuthActions} from "../action.types";

export interface AuthState {
  user: User;
};

export const initialAuthState: AuthState = {
  user: undefined
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginAction, (authState, action) => {
    return {
      user: action.user
    };
  }),
  on(AuthActions.logoutAction, (authState, action) => {
    return {
      user: undefined
    };
  })
);
