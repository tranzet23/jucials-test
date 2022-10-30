import {
  IJudicialCasesItem as IJudicialCasesItemStore,
  IJudicialCasesItemAdd,
} from 'store/judicialCases/types';
import { RouteComponentProps } from 'react-router-dom';

export type IJudicialCasesItem = IJudicialCasesItemStore;
export interface IJudicialCasesProps extends RouteComponentProps {
  areaId?: number;
  listJudicialCases: IJudicialCasesItem[];
  modalCondition: 0 | 1 | 2;
  currentItem: IJudicialCasesItemAdd;
  loadJudicialCases: (areaId: number) => {};
  addJudicialCases: (item: IJudicialCasesItem, areaId: number) => {};
  updateJudicialCases: (item: IJudicialCasesItem, areaId: number) => {};
  setJudicialCasesModal: (condition: 0 | 1 | 2, id: number) => {};
  deleteJudicialCases?: (id: number, areaId: number) => {};
}
