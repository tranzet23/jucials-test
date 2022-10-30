import React from 'react';
import {
  IJudicialHearingData,
  IParticipants,
} from 'store/judicialHearing/types';

export interface IWrapperRegionalControls {
  refWavesurfer: React.RefObject<any>;
  isPlayerReady: boolean;
  hearingData?: IJudicialHearingData;
  updateParticipants: (participants: IParticipants[]) => void;

  children: React.ReactNode;
}
