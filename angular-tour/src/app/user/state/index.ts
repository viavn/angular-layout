import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "../user";

export interface UserState {
  currentUser: User | null;
  maskUserName: boolean;
}

// Selector functions
const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.currentUser
);
