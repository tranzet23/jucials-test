import React from 'react';
import { IJudicialHearingData } from 'store/judicialHearing/types';

export interface INameSelectionsProps {
  hearingData: IJudicialHearingData | undefined;
  setWaveColors: React.Dispatch<React.SetStateAction<object>>;
  channelsNumber: number;
}
