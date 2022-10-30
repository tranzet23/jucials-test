import { ActionType } from './actionTypes';
import { IJudicialSectorsItem } from './types';

export const loadJudicialSectors = (isPreloader: boolean) => ({
  type: ActionType.LOAD_COURT_SECTORS,
  payload: isPreloader,
});

export const setJudicialSectors = (list: IJudicialSectorsItem[]) => ({
  type: ActionType.SET_COURT_SECTORS,
  payload: list,
});

export const addJudicialSector = (item: IJudicialSectorsItem) => ({
  type: ActionType.ADD_COURT_SECTOR,
  payload: item,
});

export const updateJudicialSector = (item: IJudicialSectorsItem) => ({
  type: ActionType.UPDATE_COURT_SECTOR,
  payload: item,
});

export const deleteJudicialSector = (id: number) => ({
  type: ActionType.DELETE_COURT_SECTOR,
  payload: id,
});
