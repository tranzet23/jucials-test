import {
  IDocTemplateBlockAdd,
  IDocTemplateBlockUpdate,
} from 'store/docTemplates/types';
import { IActionStatusReducer } from 'store/actionStatus/types';
import { IJudicialHearingData } from 'store/judicialHearing/types';
import { TranscribationStatuses } from 'store/transcription/types';
import { Statuses } from "pages/AudioProcessing/components/TransitPanel/TransitPanelTypes";

export interface ITranscriptionPage {
  soundFilePath: string;
  // hearingId?: string;
  waveform: [];
  getSoundFile: (fileName?: string) => {};
  addDocxFile: (data) => {};
  getInfoJudicialHearing: () => {};
  getJudicialCaseInfo: () => {};
  currentTemplate: any;
  fetchDocTemplates: (id) => void;
  fetchDocTemplate: (id) => void;
  updateDocTemplate: (data: IDocTemplateBlockUpdate) => void;
  addDocTemplate: (data: IDocTemplateBlockAdd) => void;
  setActionStatus: (data: IActionStatusReducer) => void;
  startTranscribation: () => void;
  transcribationText: any;
  dataHearing: IJudicialHearingData;
  transcribationStatus: TranscribationStatuses;
  isPlayerReady: boolean;
  soundFileStatus: Statuses;
}

export type IPlayerTypes = 'mono' | 'split' | 'hide';

export interface ITranscribationInfo {
  name: string;
  startTime: string;
  endTime: string;
  text: string;
  color: string;
}
