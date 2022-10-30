import { Action, ActionType } from './actionTypes';
import { IAudioRecording } from './types';

const INIT_STATE: IAudioRecording = {
  status: 'none',
  recordName: '',
};

const AudioRecordinReducer = (state = INIT_STATE, action: Action) => {
  switch (action.type) {
    case ActionType.SET_DATA_AUDIO_RECORDING:
      return {
        status: action.payload.status || 'none',
        recordName: action.payload.recordName,
      };
    case ActionType.SET_DEF_DATA_AUDIO:
      return {
        ...action.payload,
      };
    case ActionType.SET_DATA_ABOUT_BUSY_DEVICE:
      return {
        ...state,
        dataAboutBusyDevice: { ...action.payload },
      };
    default:
      return state;
  }
};

export default AudioRecordinReducer;
