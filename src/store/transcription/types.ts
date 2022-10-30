import { IResponse } from 'models/response';

export type SoundFileStatuses =
  | 'pending'
  | 'finished'
  | 'none'
  | 'await'
  | 'needLoad';

export type TranscribationStatuses =
  | 'none'
  | 'trascribating'
  | 'done'
  | 'error';

export interface ITranscription {
  soundFilePath?: string;
  soundFileStatus: SoundFileStatuses;
  soundFileId?: string;
  waveform: [];
  channels: string | null;
  transcribationStatus: TranscribationStatuses;
  transcribationText?: ITranscriptionTextData[];
  transcribationId?: string;
  transcribationError?: string;
  isPlayerReady: boolean;
  isUseDiarization: boolean;
}
export interface ITranscriptionTextData {
  startTime: string;
  endTime: string;
  text: string;
  speakerTag: string;
}

export interface IGetSoundFile {
  canDownload: boolean;
  waveform: string;
  path: string;
  channels: string;
  id: string;
}

export interface IGetTranscribationStart {
  done: boolean;
  id: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
}

export interface ICheckTranscribation {
  isFinished: boolean;
}

export type WrapDataGetStartTranscribation = IResponse<IGetTranscribationStart>;
export type WrapDataGetSoundFileResponse = IResponse<IGetSoundFile>;
export type WrapDataCheckTranscribation = IResponse<ICheckTranscribation>;
