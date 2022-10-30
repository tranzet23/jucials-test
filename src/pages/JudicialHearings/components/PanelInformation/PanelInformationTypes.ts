import { IJudicialCaseData } from 'store/judicialHearing/types';
export interface IPanelInformationProps {
  areaId: string;
  caseId: string;
  caseInfo: IJudicialCaseData;
  getJudicialCaseInfo;
  updateJudicialCaseInfo;
}
