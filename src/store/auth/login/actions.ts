import { ActionType, History, UserData } from './actionTypes';

export const loginUser = (userData: UserData, history: History) => {
  return {
    type: ActionType.LOGIN_USER,
    payload: { userData, history },
  };
};

export const loginSuccess = () => {
  return {
    type: ActionType.LOGIN_SUCCESS,
  };
};

export const loginFail = (error: string) => {
  return {
    type: ActionType.LOGIN_FAIL,
    payload: error,
  };
};
export const logoutUser = (history: History) => {
  return {
    type: ActionType.LOGOUT_USER,
    payload: history,
  };
};

export const logoutUserSuccess = () => {
  return {
    type: ActionType.LOGOUT_USER_SUCCESS,
  };
};
