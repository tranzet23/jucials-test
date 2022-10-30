import { Action, ActionType } from './actionTypes';
import { ITranscription } from './types';

const INIT_STATE: ITranscription = {
  soundFilePath: undefined,
  waveform: [],
  soundFileStatus: 'none',
  soundFileId: undefined,
  channels: null,
  transcribationStatus: 'none',
  transcribationText: undefined,
  transcribationError: undefined,
  isPlayerReady: false,
  isUseDiarization: false,
};

const TranscriptionReducer = (
  state: ITranscription = INIT_STATE,
  action: Action,
) => {
  switch (action.type) {
    // case ActionType.SET_SOUND_FILE_STATUS:
    //   return {
    //     ...state,
    //     soundFileStatus: action.payload,
    //   };

    case ActionType.SET_STATUS_PLAYER:
      return {
        ...state,
        isPlayerReady: action.payload,
      };

    case ActionType.SET_SOUND_FILE:
      return {
        ...state,
        soundFilePath: action.payload.soundFilePath,
        soundFileId: action.payload.soundFileId,
        waveform: action.payload.waveform,
      };

    case ActionType.SET_CHANNELS:
      return {
        ...state,
        channels: action.payload,
      };

    case ActionType.START_TRANSCRIBATION:
      return {
        ...state,
        transcribationStatus: 'trascribating',
      };

    case ActionType.STOP_TRANSCRIBATION:
      return {
        ...state,
        transcribationStatus: 'done',
        transcribationText: action.payload,
      };

    case ActionType.TRANSCRIBATION_ERROR:
      return {
        ...state,
        transcribationStatus: 'error',
        transcribationError: action.payload,
      };
    case ActionType.SET_STATUS_USE_DIARIZATION:
      return {
        ...state,
        isUseDiarization: action.payload,
      };
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default TranscriptionReducer;
