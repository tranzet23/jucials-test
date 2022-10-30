import { Action, ActionType } from './actionTypes';
import { ILayout } from './types';

const INIT_STATE: ILayout = {
  displayTheme: 'dark',
  isPreloader: false,
};

const LayoutReducer = (state = INIT_STATE, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE_THEME:
      return {
        ...state,
        displayTheme: action.payload,
      };

    default:
      return state;
  }
};

export default LayoutReducer;
