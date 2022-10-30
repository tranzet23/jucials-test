//test
export enum RESPONSE_STATUSES {
  SUCCESS = 'success',
  FAIL = 'fail',
  ERROR = 'error',
}

export interface IResponse<IData> {
  status: RESPONSE_STATUSES;
  data: IData;
  message: string;
  code: number;
}

export interface IUserCreation {
  surname: string;
  firstname: string;
  patronymic: string;
  position: string;
  role_id: number;
  password: string;
  judicial_areas: string;
}
export interface IUsersList {
  user_id: number;
  surname: string;
  lastname: string;
  firstname: string;
  username: string;
  email: string;
  role_id: number;
  role_name: string;
}
export interface IEditUser {
  user_id: number;
  surname: string;
  name: string;
  lastname: string;
  username: string;
  position: string;
  role_id: number;
  password: string;
  area_id: number;
}

export interface ICourtSectorsItem {
  data: {
    district_id: number;
    address: string;
    classification_code: string;
    district: string;
    judge: string;
  };
}
