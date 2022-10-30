import { Action, ActionType } from './actionTypes';
import { IJudicialCases } from './types';

const initialState: IJudicialCases = {
  listJudicialCases: [],
  isPreloader: false,
  modalCondition: false,
  currentItem: {},
  selectedCaseId: undefined,
  selectedCaseNumber: undefined,
  isLoading: false,
};

const JudicialCasesReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_SELECTED_JUDICIAL_CASE_ID:
      return {
        ...state,
        selectedCaseId: action.payload,
        selectedCaseNumber: state.listJudicialCases.filter(
          dataCase => dataCase.id === action.payload,
        )[0]?.case_id,
      };

    case ActionType.SET_JUDICIAL_CASES:
      return {
        ...state,
        listJudicialCases: action.payload,
        isPreloader: false,
      };
    case ActionType.LOAD_JUDICIAL_CASES:
      return {
        ...state,
        isPreloader: action.payload,
      };
    case ActionType.ADD_JUDICIAL_CASES:
      return {
        ...state,
        isLoading: true,
      }

    default:
      return state;
  }
};

export default JudicialCasesReducer;
