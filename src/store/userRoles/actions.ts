import { IFormFieldsContent } from 'pages/UserRolesForm/UserRolesFormContent';
import { ActionType } from './actionTypes';
import { IUserAccessRoles, UserRolesMessageType } from './types';

export const fetchUserRoles = () => ({
  type: ActionType.FETCH_USER_ROLES,
});

export const setUserRoles = data => ({
  type: ActionType.SET_USER_ROLES,
  payload: data,
});

export const addUserRoles = (data: IFormFieldsContent) => ({
  type: ActionType.ADD_USER_ROLES,
  payload: data,
});

export const updateUserRoles = (data: IFormFieldsContent) => ({
  type: ActionType.UPDATE_USER_ROLES,
  payload: data,
});

export const deleteUserRoles = (id: number) => ({
  type: ActionType.DELETE_USER_ROLES,
  payload: id,
});

export const setUserRolesModalCondition = (condition = false, id = null) => ({
  type: ActionType.SET_USER_ROLES_MODAL,
  payload: { condition, id },
});

export const getUserRole = (id: number) => ({
  type: ActionType.GET_USER_ROLE_EDIT,
  payload: id,
});

export const setUserRole = (data: IFormFieldsContent | null = null) => ({
  type: ActionType.SET_USER_ROLE_EDIT,
  payload: data,
});

export const fetchUserAccessRoles = () => ({
  type: ActionType.FETCH_ACCESS_USER_ROLES,
});

export const setUserAccessRoles = (data: IUserAccessRoles) => ({
  type: ActionType.SET_ACCESS_USER_ROLES,
  payload: data,
});

export const setUserRolesMessage = (msg: UserRolesMessageType) => ({
  type: ActionType.SET_USER_ROLES_MESSAGE,
  payload: msg,
});
