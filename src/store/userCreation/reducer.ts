import { ICreatedUserState } from './types';
import { Action, ActionType } from './actionTypes';

let INIT_STATE: ICreatedUserState = {
  isPreloader: false,
  response: null,
  createdUser: undefined,
  listRoles: undefined,
};

const UserCreationReducer = (state = INIT_STATE, action: Action) => {
  switch (action.type) {
    case ActionType.USER_CREATION:
      return {
        ...state,
        response: action.payload.response,
        createdUser: {
          ...state.createdUser,
          ...action.payload.createdUser[0],
        },
        isPreloader: false,
      };
    case ActionType.ADD_USER:
      return {
        ...state,
        createdUser: { ...state.createdUser, ...action.payload },
        isPreloader: true,
      };
    case ActionType.EDIT_USER:
      return {
        ...state,
        createdUser: {
          ...state.createdUser,
          ...action.payload.data.createdUser,
        },
        isPreloader: true,
      };
    case ActionType.LOAD_USER:
      return {
        ...state,
        isPreloader: false,
      };

    case ActionType.SET_LIST_ROLES:
      return {
        ...state,
        listRoles: action.payload,
      };
    case ActionType.CLEAN_STATE:
      return INIT_STATE;

    default:
      return state;
  }
};
export default UserCreationReducer;
