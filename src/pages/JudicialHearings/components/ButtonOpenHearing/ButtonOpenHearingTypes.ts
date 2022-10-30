import { SoundFileStatuses } from 'store/transcription/types';
export interface IButtonOpenHearingProps {
  hearingId: string;
  setSelectedJudicialHearingId: (hearingId: string) => void;
  setListHearings: () => {};
  setChannels: (count?: string) => void;
  setInfoJudicialHearing: () => void;
  setStatusUseDiarization: (boolean: false) => void;
}
