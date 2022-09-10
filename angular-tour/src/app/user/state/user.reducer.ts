import { createReducer, on } from "@ngrx/store";
import { UserState } from ".";
import { UserPageActions } from "./actions";

const initialState: Readonly<UserState> = {
  currentUser: null,
  maskUserName: false
};

export const userReducer = createReducer(
  initialState,
  on(UserPageActions.maskUserName, state => {
    return {
      ...state,
      maskUserName: !state.maskUserName
    };
  })
);
