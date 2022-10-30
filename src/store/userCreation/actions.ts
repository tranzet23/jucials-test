import { ActionType } from './actionTypes';
import { ICreatedUserState, EditUser, Role } from './types';

export const userCreation = (data: any, response: any = null) => ({
  type: ActionType.USER_CREATION,
  payload: { createdUser: data, response: response },
});

export const cleanState = () => ({
  type: ActionType.CLEAN_STATE,
});

export const addCreation = (data: ICreatedUserState, history) => ({
  type: ActionType.ADD_USER,
  payload: { data, history },
});
export const loadUser = (id: number) => ({
  type: ActionType.LOAD_USER,
  payload: id,
});
export const editUser = (data: EditUser, history) => ({
  type: ActionType.EDIT_USER,
  payload: { data, history },
});

export const loadListRoles = () => ({
  type: ActionType.LOAD_LIST_ROLES,
});

export const setListRoles = (data?: Role[]) => ({
  type: ActionType.SET_LIST_ROLES,
  payload: data,
});
