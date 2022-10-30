import { Action, ActionType } from './actionTypes';
import { IJudicialHearing } from './types';

const INIT_STATE: IJudicialHearing = {
  dataHearing: undefined,
  caseInfo: undefined,
  modeHearing: 'none', // Изменение modeHearing тригерит открытие модалки, а hearingStatus обновляет статус на API
  hearingStatus: 'none',
  listHearings: undefined,
  errorGetListHearings: '',
  isUploadingAudio: false,
  selectedHearingId: undefined,
  selectedHearingNumber: undefined,
  currentDocument: undefined,
  selectedDocument: null,
  documentText: undefined,
};

const JudicialHearingReducer = (state = INIT_STATE, action: Action) => {
  switch (action.type) {
    case ActionType.SET_SELECTED_HEARING_ID:
      return {
        ...state,
        selectedHearingId: action.payload,
      };

    case ActionType.UPDATE_MODE_HEARING:
      return {
        ...state,
        modeHearing: action.payload,
      };

    case ActionType.UPDATE_HEARING_STATUS:
      return {
        ...state,
        hearingStatus: action.payload,
      };

    case ActionType.UPDATE_PARTICIPANTS:
      return {
        ...state,
        dataHearing: {
          ...state.dataHearing,
          participants: [...action.payload],
        },
      };

    case ActionType.SET_INFO_HEARING:
      return {
        ...state,
        dataHearing: action.payload || undefined,
      };

    case ActionType.SET_LIST_HEARINGS:
      return {
        ...state,
        listHearings: action.payload,
      };

    case ActionType.SET_ERROR_GET_LIST_HEARINGS:
      return {
        ...state,
        errorGetListHearings: action.payload,
        listHearings: undefined,
      };

    case ActionType.IS_LOADIND_AUDIO:
      return {
        ...state,
        isUploadingAudio: action.payload,
      };

    case ActionType.SET_INFO_HEARING_CASE:
      return {
        ...state,
        caseInfo: action.payload,
      };

    case ActionType.DELETE_JUDICIAL_HEARING:
      //@ts-ignore
      let myArray = [...state.listHearings];
      let newArray = myArray.filter(hearing => {
        return hearing.id !== action.payload;
      });

      return { ...state, listHearings: [...newArray] };
    case ActionType.SET_SELECTED_HEARING_NUMBER:
      return { ...state, selectedHearingNumber: action.payload };
    case ActionType.SET_DOCUMENT:
      return {
        ...state,
        currentDocument: action.payload.document,
        documentText: action.payload.documentText,
      };
    case ActionType.SET_SELECTED_DOCUMENT:
      return {
        ...state,
        selectedDocument: action.payload,
      };

    case ActionType.DELETE_DOCUMENT:
      return {
        ...state,
        currentDocument: undefined,
        selectedDocument: null,
        documentText: undefined,
      };

    default:
      return state;
  }
};

export default JudicialHearingReducer;
