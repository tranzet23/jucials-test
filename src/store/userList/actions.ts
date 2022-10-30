import { ActionType } from './actionTypes';
import { User } from './types';

export const loadUsersList = (isPreloader: boolean) => ({
  type: ActionType.LOAD_USERS_LIST,
  payload: isPreloader,
});
export const setUsersList = (list: User[]) => ({
  type: ActionType.SET_USERS_LIST,
  payload: list,
});
export const deleteUser = (id: number) => ({
  type: ActionType.DELETE_USER,
  payload: id,
});
