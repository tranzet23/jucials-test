import React from 'react';
import { IPlayerTypes } from 'pages/TranscriptionPage/TranscriptionPageTypes';
import { IParticipants } from 'store/judicialHearing/types';

export interface IPropsPlayer {
  refWavesurfer: React.RefObject<any>;
  playerType: IPlayerTypes;
  setPlayerType: React.Dispatch<React.SetStateAction<IPlayerTypes>>;
  setCurrentTime: (time: number) => void;
  children: React.ReactNode;
  isPlayerReady: boolean;
}

export interface IMultiChannelForm {
  channels: IParticipants[];
}
