import {createAction, props} from '@ngrx/store';
import {User} from "../model/user";

export const loginAction = createAction(
  "[LoginComponent] USER_SIGNED_IN",
  props<{ user: User }>()
);

export const logoutAction = createAction(
  "[SideMenu] USER_SIGNED_OUT"
);
