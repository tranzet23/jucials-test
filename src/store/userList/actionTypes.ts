import { IUsersList } from '../../models/response';

export enum ActionType {
  LOAD_USERS_LIST = 'LOAD_USERS_LIST',
  SET_USERS_LIST = 'SET_USERS_LIST',
  DELETE_USER = 'DELETE_USER',
  SET_LIST_ROLES = 'SET_LIST_ROLES',
}

export interface LoadUsersList {
  type: ActionType.LOAD_USERS_LIST;
  payload: boolean;
}
export interface SetUsersList {
  type: ActionType.SET_USERS_LIST;
  payload: IUsersList[];
}
export interface DeleteUser {
  type: ActionType.DELETE_USER;
  payload: number;
}

export type Action = LoadUsersList | SetUsersList | DeleteUser;
