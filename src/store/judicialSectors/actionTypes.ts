import { IJudicialSectorsItem, IJudicialSectors } from './types';

export enum ActionType {
  LOAD_COURT_SECTORS = 'LOAD_COURT_SECTORS',
  SET_COURT_SECTORS = 'SET_COURT_SECTORS',
  DELETE_COURT_SECTOR = 'DELETE_COURT_SECTOR',
  UPDATE_COURT_SECTOR = 'UPDATE_COURT_SECTOR',
  ADD_COURT_SECTOR = 'ADD_COURT_SECTOR',
}

export interface SetJudicialSectors {
  type: ActionType.SET_COURT_SECTORS;
  payload: IJudicialSectors[];
}

export interface LoadJudicialSectors {
  type: ActionType.LOAD_COURT_SECTORS;
  payload: boolean;
}
export interface UpdateJudicialSector {
  type: ActionType.UPDATE_COURT_SECTOR;
  payload: IJudicialSectorsItem;
}
export interface AddJudicialSector {
  type: ActionType.ADD_COURT_SECTOR;
  payload: IJudicialSectorsItem;
}

export interface DeleteJudicialSector {
  type: ActionType.DELETE_COURT_SECTOR;
  payload: number;
}

export type Action =
  | LoadJudicialSectors
  | SetJudicialSectors
  | DeleteJudicialSector
  | UpdateJudicialSector
  | AddJudicialSector;
