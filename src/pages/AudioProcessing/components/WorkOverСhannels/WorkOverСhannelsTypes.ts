import {
  IJudicialHearingData,
  IParticipants,
} from 'store/judicialHearing/types';

export interface IWorkOverHearingsProps {
  dataHearing?: IJudicialHearingData;
  updateParticipants: (participants: IParticipants[]) => void;
}
