import React from 'react';
import { TranscribationStatuses } from 'store/transcription/types';

export interface ITranscribatoinStartButton {
  transcribationStatus: TranscribationStatuses;
  handleTranscriptionStart: () => void;
  setIsTranscribationTime: React.Dispatch<React.SetStateAction<boolean>>;
  setStatusUseDiarization: (isUse: boolean) => void;
}
