import { ActionType } from './actionTypes';
import { IGetSoundFile } from './types';

export const getSoundFile = (name?: string) => ({
  type: ActionType.GET_SOUND_FILE,
  payload: name,
});
export const setSoundFile = (data: IGetSoundFile) => ({
  type: ActionType.SET_SOUND_FILE,
  payload: {
    soundFilePath: data.path,
    soundFileId: data.id,
    waveform: data.waveform,
  },
});

// export const setSoundFileStatus = (soundFile: SoundFileStatuses) => ({
//   type: ActionType.SET_SOUND_FILE_STATUS,
//   payload: soundFile,
// });

export const setStatusPlayer = (status: boolean) => ({
  type: ActionType.SET_STATUS_PLAYER,
  payload: status,
});

export const setChannels = (channels?: string) => ({
  type: ActionType.SET_CHANNELS,
  payload: channels,
});

export const startTranscribation = () => ({
  type: ActionType.START_TRANSCRIBATION,
});

export const stopTranscribation = (data: any) => ({
  type: ActionType.STOP_TRANSCRIBATION,
  payload: data,
});

export const TranscribationError = (message: string) => ({
  type: ActionType.TRANSCRIBATION_ERROR,
  payload: message,
});

export const saveTranscribationText = (data: []) => ({
  type: ActionType.TRANSCRIBATION_SAVE,
  payload: data,
});

export const setStatusUseDiarization = (status: boolean) => ({
  type: ActionType.SET_STATUS_USE_DIARIZATION,
  payload: status,
});
