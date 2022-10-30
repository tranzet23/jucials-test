import {IJudicialHearingData, ModesHearing} from "store/judicialHearing/types";

export interface IHearingStatusDropdown {
  children: React.ReactNode;
  hearingInfo: IJudicialHearingData;
  updateHearingStatus: (status: ModesHearing) => void;
  setSelectedJudicialHearingId: (hearingId: string) => void;
}