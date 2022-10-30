import { IJudicialCaseData, ModesHearing } from 'store/judicialHearing/types';
import { RouteComponentProps } from 'react-router-dom';

export interface IDeleteModal extends RouteComponentProps {
  selectedHearingId: string;
  modeHearing: ModesHearing;
  selectedHearingNumber: number | string;
  caseInfo?: IJudicialCaseData;
  updateModeHearing: (modeHearing: ModesHearing) => unknown;
  deleteJudicialHearing: Function;
}
