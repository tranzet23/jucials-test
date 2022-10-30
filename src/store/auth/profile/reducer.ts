import { Action, ActionType } from './actionTypes';
import userLogo from 'assets/images/users/administrator.png';
import { IProfile } from './types';

const initialState: IProfile = {
  username: '',
  position: '',
  pages: [],
  roleId: 5,
  areaId: undefined,
  areaAddress: '',
};

const ProfileReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.GET_PROFILE_DATA_SUCCESS:
      return {
        ...payload,
        icon: userLogo,
      };
    case ActionType.GET_PROFILE_DATA_FAIL:
      return {
        ...initialState,
      };
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default ProfileReducer;
