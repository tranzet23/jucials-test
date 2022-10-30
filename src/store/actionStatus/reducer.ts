import { Action, ActionType } from './actionTypes';
import { IActionStatusReducer } from './types';

const INIT_STATE: IActionStatusReducer = {
  status: undefined,
  message: undefined,
};

const ActionStatusReducer = (state = INIT_STATE, action: Action) => {
  switch (action.type) {
    case ActionType.SET_ACTION_STATUS:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
      };

    default:
      return state;
  }
};

export default ActionStatusReducer;
