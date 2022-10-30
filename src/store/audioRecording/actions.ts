import { RouteComponentProps } from 'react-router-dom';
import {
  IAudioRecordingData,
  RecordingStatuses,
  IDataAboutBusyDevice,
} from './types';
import { ActionType } from './actionTypes';
type History = RouteComponentProps['history'];

export const changeStatusAudioRecording = (
  status: RecordingStatuses,
  history: History,
) => ({
  type: ActionType.CHANGE_STATUS_AUDIO_RECORDING,
  payload: { status, history },
});

export const setDataAudioRecording = (data: IAudioRecordingData) => ({
  type: ActionType.SET_DATA_AUDIO_RECORDING,
  payload: data,
});

export const getStatusAudioRecording = () => ({
  type: ActionType.GET_STATUS_AUDIO_RECORDING,
});

export const cancelStatusPolling = () => ({
  type: ActionType.CANCEL_STATUS_POLLING,
});

export const setDefDataStatusAudio = () => ({
  type: ActionType.SET_DEF_DATA_AUDIO,
  payload: { status: '', recordName: '' },
});

export const checkDataAboutBusyDevice = () => ({
  type: ActionType.CHECK_DATA_ABOUT_BUSY_DEVICE,
});

export const setDataAboutBusyDevice = (data?: IDataAboutBusyDevice) => ({
  type: ActionType.SET_DATA_ABOUT_BUSY_DEVICE,
  payload: data,
});
// export const getSoundFileStatus = (soundFile: SoundFileStatuses) => ({
//   type: ActionType.SET_SOUND_FILE_STATUS,
//   payload: soundFile,
// });
