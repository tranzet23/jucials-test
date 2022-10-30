import { Action, ActionType } from './actionTypes';
import { ILogin } from './types';

const initialState: ILogin = {
  error: null,
  loading: false,
};

const LoginReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.LOGIN_USER:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ActionType.LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case ActionType.LOGIN_FAIL:
      state = {
        ...state,
        loading: false,
        error: action.payload,
      };
      break;
    case ActionType.LOGOUT_USER_SUCCESS:
      state = { ...initialState };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default LoginReducer;
