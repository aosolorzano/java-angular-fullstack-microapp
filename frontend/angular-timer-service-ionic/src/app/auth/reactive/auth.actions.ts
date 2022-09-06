import {createAction, props} from '@ngrx/store';
import {User} from "../interfaces/user";

export const login = createAction(
  "[AuthService] USER_SIGNED_IN",
  props<{ user: User }>()
);

export const logout = createAction(
  "[SideMenu] USER_SIGNED_OUT"
);
