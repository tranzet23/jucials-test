import { IPlayerTypes } from 'pages/TranscriptionPage/TranscriptionPageTypes';
export interface ITRegionsProps {
  playerType: IPlayerTypes;
  refWavesurfer: React.RefObject<any>;
  regions: any[];

  isPlayerReady: boolean;
}
