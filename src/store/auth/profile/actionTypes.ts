import { IProfile } from './types';
export enum ActionType {
  GET_PROFILE_DATA = 'GET_PROFILE_DATA',
  GET_PROFILE_DATA_SUCCESS = 'GET_PROFILE_DATA_SUCCESS',
  GET_PROFILE_DATA_FAIL = 'GET_PROFILE_DATA_FAIL',
}

interface IGetProfileData {
  type: ActionType.GET_PROFILE_DATA;
  payload: IProfile;
}

interface IGetProfileDataSuccess {
  type: ActionType.GET_PROFILE_DATA_SUCCESS;
  payload: IProfile;
}

interface IGetProfileDataFail {
  type: ActionType.GET_PROFILE_DATA_FAIL;
  payload: IProfile;
}
export type Action =
  | IGetProfileData
  | IGetProfileDataSuccess
  | IGetProfileDataFail;
