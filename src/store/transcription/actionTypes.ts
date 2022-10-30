import { ITranscriptionTextData } from './types';
export enum ActionType {
  GET_SOUND_FILE = 'GET_SOUND_FILE',
  SET_SOUND_FILE = 'SET_SOUND_FILE',
  SET_SOUND_FILE_STATUS = 'SET_SOUND_FILE_STATUS',
  SET_CHANNELS = 'SET_CHANNELS',
  START_TRANSCRIBATION = 'START_TRANSCRIBATION',
  STOP_TRANSCRIBATION = 'STOP_TRANSCRIBATION',
  TRANSCRIBATION_ERROR = 'TRANSCRIBATION_ERROR',
  SET_STATUS_PLAYER = 'SET_STATUS_PLAYER',
  TRANSCRIBATION_SAVE = 'TRANSCRIBATION_SAVE',
  SET_STATUS_USE_DIARIZATION = 'SET_STATUS_USE_DIARIZATION',
}

export interface ISetStatusPlayer {
  type: ActionType.SET_STATUS_PLAYER;
  payload: boolean;
}

export interface ISetSoundFile {
  type: ActionType.SET_SOUND_FILE;
  payload: {
    soundFilePath: string;
    soundFileId: string;
    waveform: [];
  };
}

export interface ISetSoundFileStatus {
  type: ActionType.SET_SOUND_FILE_STATUS;
  payload: string;
}
export interface ISetChannels {
  type: ActionType.SET_CHANNELS;
  payload: string;
}

export interface IStartTranscribation {
  type: ActionType.START_TRANSCRIBATION;
}

export interface IStopTranscribation {
  type: ActionType.STOP_TRANSCRIBATION;
  payload: any;
}

export interface ITranscribationError {
  type: ActionType.TRANSCRIBATION_ERROR;
  payload: string;
}

export interface ISetStatusUseDiarization {
  type: ActionType.SET_STATUS_USE_DIARIZATION;
  payload: boolean;
}

export interface ITranscribationText {
  type: ActionType.STOP_TRANSCRIBATION;
  payload: {
    transcribationStatus: string;
    transcribationText: ITranscriptionTextData;
  };
}

export type Action =
  | ISetSoundFile
  | ISetSoundFileStatus
  | ISetChannels
  | IStartTranscribation
  | IStopTranscribation
  | ITranscribationError
  | ISetStatusPlayer
  | ITranscribationText
  | ISetStatusUseDiarization;
