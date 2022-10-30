import { IListUsersState } from './types';
import { Action, ActionType } from './actionTypes';

const INIT_STATE: IListUsersState = {
  isPreloader: false,
  error: null,
  listUsers: [],
};

const UsersListReducer = (state = INIT_STATE, action: Action) => {
  switch (action.type) {
    case ActionType.LOAD_USERS_LIST:
      return {
        ...state,
        isPreloader: action.payload,
      };
    case ActionType.SET_USERS_LIST:
      return {
        ...state,
        listUsers: action.payload,
        isPreloader: false,
      };
    case ActionType.DELETE_USER:
      return {
        ...state,
      };
    // case ActionType.ADD_USER:
    //     return {
    //         ...state, createdUser:{...state.createdUser, ...action.payload,},
    //         isPreloader: true,
    //     };
    // case ActionType.LOAD_USER_CREATION:
    //     return {
    //         ...state,
    //         isPreloader: action.payload,
    //     };

    default:
      return state;
  }
};
export default UsersListReducer;
