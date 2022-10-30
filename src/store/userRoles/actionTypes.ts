import { IFormFieldsContent } from 'pages/UserRolesForm/UserRolesFormContent';
import { UserRolesMessageType } from './types';

export enum ActionType {
  FETCH_USER_ROLES = 'FETCH_USER_ROLES',
  SET_USER_ROLES = 'SET_USER_ROLES',
  ADD_USER_ROLES = 'ADD_USER_ROLES',
  UPDATE_USER_ROLES = 'UPDATE_USER_ROLES',
  DELETE_USER_ROLES = 'DELETE_USER_ROLES',
  SET_USER_ROLES_MODAL = 'SET_USER_ROLES_MODAL',
  GET_USER_ROLE_EDIT = 'GET_USER_ROLE_EDIT',
  SET_USER_ROLE_EDIT = 'SET_USER_ROLE_EDIT',
  FETCH_ACCESS_USER_ROLES = 'FETCH_ACCESS_USER_ROLES',
  SET_ACCESS_USER_ROLES = 'SET_ACCESS_USER_ROLES',
  SET_USER_ROLES_MESSAGE = 'SET_USER_ROLES_MESSAGE',
}

export interface IFetchUserRoles {
  type: ActionType.FETCH_USER_ROLES;
}
export interface ISetUserRoles {
  type: ActionType.SET_USER_ROLES;
  payload: any;
}
export interface IAddUserRoles {
  type: ActionType.ADD_USER_ROLES;
  payload: IFormFieldsContent;
}

export interface IUpdateUserRoles {
  type: ActionType.UPDATE_USER_ROLES;
  payload: IFormFieldsContent;
}
export interface IDeleteUserRoles {
  type: ActionType.DELETE_USER_ROLES;
  payload: number;
}
export interface ISetUserRolesModalCondition {
  type: ActionType.SET_USER_ROLES_MODAL;
  payload: boolean;
}

export interface IGetUserRoleEdit {
  type: ActionType.GET_USER_ROLE_EDIT;
  payload: number;
}

export interface ISetUserRoleEdit {
  type: ActionType.SET_USER_ROLE_EDIT;
  payload: IFormFieldsContent;
}

export interface IFetchUserAccessRoles {
  type: ActionType.FETCH_ACCESS_USER_ROLES;
}

export interface ISetUserAccessRoles {
  type: ActionType.SET_ACCESS_USER_ROLES;
}

export interface ISetUserRolesMessage {
  type: ActionType.SET_USER_ROLES_MESSAGE;
  payload: UserRolesMessageType;
}
export type Action =
  | IFetchUserRoles
  | ISetUserRoles
  | IAddUserRoles
  | IUpdateUserRoles
  | IDeleteUserRoles
  | ISetUserRolesModalCondition
  | IGetUserRoleEdit
  | ISetUserRoleEdit
  | IFetchUserAccessRoles
  | ISetUserAccessRoles
  | ISetUserRolesMessage;
