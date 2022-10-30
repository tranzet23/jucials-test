import React from 'react';

export interface IHotkeysProps {
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  setSoundSpeed: React.Dispatch<React.SetStateAction<number>>;
  rewindForward: () => void;
  rewindBackward: () => void;
  isPlayerReady: boolean;
}
