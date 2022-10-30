import { IPlayerTypes } from 'pages/TranscriptionPage/TranscriptionPageTypes';
import React from 'react';

export interface IWavesurferWaveProps {
  soundFilePath: string;
  typePlayer: IPlayerTypes;
  waveform: number[][];
  currentTime: number;
  setStatusPlayer: (status: boolean) => void;
}
