import { RouteComponentProps } from 'react-router-dom';
import {
  ModesHearing,
  IDataAddJudicialHearingRequest,
  IJudicialCaseData,
} from 'store/judicialHearing/types';

export interface IControllerHearingProps extends RouteComponentProps {
  modeHearing: ModesHearing;
  caseInfo?: IJudicialCaseData;
  updateModeHearing: (modeHearing: ModesHearing) => {};
  addJudicialHearing: (
    data: IDataAddJudicialHearingRequest,
    history: RouteComponentProps['history'],
  ) => {};
}
