import { ActionType } from './actionTypes';
import { IProfile } from './types';

export const getProfileData = () => {
  return {
    type: ActionType.GET_PROFILE_DATA,
  };
};

export const getProfileDataSuccess = (profileData: IProfile) => {
  return {
    type: ActionType.GET_PROFILE_DATA_SUCCESS,
    payload: profileData,
  };
};

export const getProfileDataFail = () => {
  return {
    type: ActionType.GET_PROFILE_DATA_FAIL,
  };
};
