import { IResponse } from 'models/response';

export interface ILogin {
  error: string | null;
  loading: boolean;
}
export interface IDataUserLogin {
  accessToken: string;
  refreshToken: string;
  accessExpires: string;
  refreshExpires: string;
  pages: string[];
  user: {
    name: string;
    surname: string;
    username: string;
    position: string;
    lastname: string;
  };
}

export type WrapDataUserLoginResponse = IResponse<IDataUserLogin>;
