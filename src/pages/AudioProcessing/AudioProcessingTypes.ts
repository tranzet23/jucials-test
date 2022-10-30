import { ReactChild } from 'react';
import { Statuses } from "./components/TransitPanel/TransitPanelTypes";

export interface IAudioProcessingProps {
  children: ReactChild;
  isPlayerReady: boolean;
  soundFileStatus: Statuses;
}
