import { IResponse } from 'models/response';

export interface IProfile {
  username: string;
  roleId: number;
  position: string;
  pages: string[];
  areaId?: number;
  userId?: number;
  areaAddress: string;
}
export interface IDataProfile {
  user: {
    name: string;
    surname: string;
    username: string;
    position: string;
    lastname: string;
    role_id: number;
    user_id: number;
  };
  areas: {
    address: string;
    district_id: 0;
  };
  pages: string[];
}

export type WrapDataProfileResponse = IResponse<IDataProfile>;
