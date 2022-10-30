import { ReactChild } from 'react';
import { SoundFileStatuses } from 'store/transcription/types';
import { RecordingStatuses } from 'store/audioRecording/types';
export type Statuses =
  | SoundFileStatuses
  | 'run'
  | 'pause'
  | 'recording'
  | 'loading'
  | RecordingStatuses;

export interface ITransitPanelProps {
  status: Statuses;
  children: ReactChild;
  getStatusAudioRecording: () => void;
  cancelStatusPolling: () => void;
  setDefDataStatusAudio: () => void;
}
