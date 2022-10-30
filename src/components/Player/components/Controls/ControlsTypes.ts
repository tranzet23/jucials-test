import React from 'react';
import { IPlayerTypes } from 'pages/TranscriptionPage/TranscriptionPageTypes';

export interface IPropsControls {
  soundSpeed: number;
  setSoundSpeed: React.Dispatch<React.SetStateAction<number>>;

  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  rewindForward: () => void;
  rewindBackward: () => void;
  playerType: IPlayerTypes;
  setPlayerType: React.Dispatch<React.SetStateAction<IPlayerTypes>>;

  isLoading: boolean;
  children: React.ReactNode;
}
