import { RouteComponentProps } from 'react-router-dom';
import {
  IAudioRecordingData,
  RecordingStatuses,
  IDataAboutBusyDevice,
} from './types';
export type History = RouteComponentProps['history'];

export enum ActionType {
  GET_STATUS_AUDIO_RECORDING = 'GET_STATUS_AUDIO_RECORDING',
  CANCEL_STATUS_POLLING = 'CANCEL_STATUS_POLLING',
  START_STATUS_POLLING = 'START_STATUS_POLLING',
  SET_DATA_AUDIO_RECORDING = 'SET_DATA_AUDIO_RECORDING',
  SET_STATUS_AUDIO_RECORDING = 'SET_STATUS_AUDIO_RECORDING',
  CHANGE_STATUS_AUDIO_RECORDING = 'CHANGE_STATUS_AUDIO_RECORDING',
  SET_DEF_DATA_AUDIO = 'SET_DEF_DATA_AUDIO',
  CHECK_DATA_ABOUT_BUSY_DEVICE = 'CHECK_DATA_ABOUT_BUSY_DEVICE',
  SET_DATA_ABOUT_BUSY_DEVICE = 'SET_DATA_ABOUT_BUSY_DEVICE',
}

export interface IChangeStatusRecording {
  type: ActionType.SET_STATUS_AUDIO_RECORDING;
  payload: { status: RecordingStatuses; history: History };
}

export interface IDataAudioRecording {
  type: ActionType.SET_DATA_AUDIO_RECORDING;
  payload: IAudioRecordingData;
}

export interface IDataDef {
  type: ActionType.SET_DEF_DATA_AUDIO;
  payload: IAudioRecordingData;
}

export interface ISetDataAboutBusyDevice {
  type: ActionType.SET_DATA_ABOUT_BUSY_DEVICE;
  payload: IDataAboutBusyDevice;
}

export type Action =
  | IChangeStatusRecording
  | IDataAudioRecording
  | IDataDef
  | ISetDataAboutBusyDevice;
