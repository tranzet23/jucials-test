import { RouteComponentProps } from 'react-router-dom';
export type History = RouteComponentProps['history'];

export enum ActionType {
  LOGIN_USER = 'LOGIN_USER',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',
  LOGOUT_USER = 'LOGOUT_USER',
  LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS',
  API_ERROR = 'LOGIN_API_ERROR',
  SOCIAL_LOGIN = 'SOCIAL_LOGIN',
}

export type UserData = {
  user: string;
  pass: string;
};

export interface ILoginUser {
  type: ActionType.LOGIN_USER;
  payload: {
    userData: UserData;
    history: History;
  };
}

export interface ILoginSuccess {
  type: ActionType.LOGIN_SUCCESS;
}

export interface ILoginFail {
  type: ActionType.LOGIN_FAIL;
  payload: string;
}

export interface ILogoutUser {
  type: ActionType.LOGOUT_USER;
  payload: History;
}

export interface ILogoutUserSuccess {
  type: ActionType.LOGOUT_USER_SUCCESS;
  payload: {};
}

export type Action =
  | ILoginUser
  | ILoginSuccess
  | ILoginFail
  | ILogoutUser
  | ILogoutUserSuccess;
