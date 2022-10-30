import { IResponse } from 'models/response';

export interface ICreatedUserState {
  isPreloader?: boolean;
  response: null | any;
  createdUser?: EditUser;
  listRoles?: Role[];
}

export interface ResponsePayload {
  response: object;
  createdUser: AddUser | EditUser;
}

export interface AddUser {
  user_id?: string;
  surname: string;
  name: string;
  lastname: string;
  username: string;
  position: string;
  password: string;
  area_id: never[];
  role_id: number;
}

export interface EditUser {
  user_id: string;
  surname: string;
  name: string;
  lastname: string;
  username: string;
  position: string;
  password: string;
  area_id: never[];
  role_id: string;
}

export interface Role {
  role_id: string;
  name: string;
}

export type ResponseRole = IResponse<Role[]>;
