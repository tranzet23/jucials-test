import { Action, ActionType } from './actionTypes';
import { IJudicialSectors } from './types';

const INIT_STATE: IJudicialSectors = {
  listJudicialSectors: [],
  isPreloader: false,
};

const JudicialSectorsReducer = (state = INIT_STATE, action: Action) => {
  switch (action.type) {
    case ActionType.SET_COURT_SECTORS:
      return {
        ...state,
        listJudicialSectors: action.payload,
        isPreloader: false,
      };
    case ActionType.LOAD_COURT_SECTORS:
      return {
        ...state,
        isPreloader: action.payload,
      };
    default:
      return state;
  }
};

export default JudicialSectorsReducer;
