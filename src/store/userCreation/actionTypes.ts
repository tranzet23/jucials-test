import { RouteComponentProps } from 'react-router-dom';
import { ResponsePayload } from './types';

export enum ActionType {
  USER_CREATION = 'USER_CREATION',
  CLEAN_STATE = 'CLEAN_STATE',
  ADD_USER = 'ADD_USER',
  EDIT_USER = 'EDIT_USER',
  LOAD_USER = 'LOAD_USER',
  LOAD_LIST_ROLES = 'LOAD_LIST_ROLES',
  SET_LIST_ROLES = 'SET_LIST_ROLES',
}
export type History = RouteComponentProps['history'];

export interface UserCreation {
  type: ActionType.USER_CREATION;
  payload: any;
}

export interface CleanState {
  type: ActionType.CLEAN_STATE;
}

export interface AddUser {
  type: ActionType.ADD_USER;
  payload: { data: ResponsePayload; history: History };
}

export interface EditUser {
  type: ActionType.EDIT_USER;
  payload: { data: ResponsePayload; history: History };
}

export interface LoadUser {
  type: ActionType.LOAD_USER;
  payload: any;
}

export interface SetListRoles {
  type: ActionType.SET_LIST_ROLES;
  payload: any;
}

export type Action =
  | UserCreation
  | AddUser
  | EditUser
  | LoadUser
  | CleanState
  | SetListRoles;
