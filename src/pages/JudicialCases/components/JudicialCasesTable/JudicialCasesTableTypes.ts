import {
  IJudicialCasesItem as IJudicialCasesItemStore,
  IJudicialCasesItemPeople,
} from 'store/judicialCases/types';
import { RouteComponentProps } from 'react-router-dom';

export type IJudicialCasesItem = IJudicialCasesItemStore;



export interface IJudicialCasesTableProps extends RouteComponentProps {
  listJudicialCases?: IJudicialCasesItem[];
}

export type sortOrder = 'desc' | 'asc';
