import { IResponse } from 'models/response';
export type RecordingStatuses =
  | 'none'
  | 'run'
  | 'pause'
  | 'stop'
  | 'processing'
  | 'busy'
  | 'ready'
  | 'needLoad'
  | 'loaded'
  | 'recording'
  | '';

export interface IAudioRecordingData {
  status: RecordingStatuses;
  recordName: string;
}
export interface IStatusAudio {
  status: RecordingStatuses;
  name: string;
}

export interface IDataAboutBusyDevice {
  meetingId: string;
  caseId: string;
  isBusy: boolean;
}

export interface IDataSetStatusAudioRecordingRequest {
  status: RecordingStatuses;
  meeting_id: string;
  case_id: string;
  date: string;
  recordName: string;
}

export interface IAudioRecording extends IAudioRecordingData {
  dataAboutBusyDevice?: IDataAboutBusyDevice;
}
export type WrapResponseSetStatusAudioRecording =
  IResponse<IAudioRecordingData>;

export type WrapResponseGetStatusAudioRecording = IResponse<IStatusAudio>;

export type WrapResponseGetDataAboutBusyDevice =
  IResponse<IDataAboutBusyDevice>;
