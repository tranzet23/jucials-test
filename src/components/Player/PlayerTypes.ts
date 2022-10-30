import React from 'react';
import { IPlayerTypes } from 'pages/TranscriptionPage/TranscriptionPageTypes';
import { IParticipants } from 'store/judicialHearing/types';

export interface IPropsPlayer {
  soundFilePath: string;
  waveform: [];
  playerType: IPlayerTypes;
  setPlayerType: React.Dispatch<React.SetStateAction<IPlayerTypes>>;

  children: React.ReactNode;
}

export interface IMultiChannelForm {
  channels: IParticipants[];
}
