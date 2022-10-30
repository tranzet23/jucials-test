import { IPlayerTypes } from 'pages/TranscriptionPage/TranscriptionPageTypes';
export interface ITRegionsProps {
  playerType: IPlayerTypes;
  refWavesurfer: React.RefObject<any>;
  isUseDiarization: boolean;
}
