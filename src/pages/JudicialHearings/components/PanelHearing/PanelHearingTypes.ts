import { IParticipants, IDocumentation } from 'store/judicialHearing/types';
export interface IItemHearings {
  number: string;
  id: number;
  result: string;
  time: string;
  date: string;
  participants: IParticipants[];
  documentation: IDocumentation[];
}

export interface IPanelHearingProps {
  listHearings?: IItemHearings[];
}
