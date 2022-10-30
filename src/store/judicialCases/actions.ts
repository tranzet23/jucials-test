import {ActionType, IAddJudicialCases} from './actionTypes';
import { IJudicialCasesItem, IJudicialCasesItemAdd} from './types';

export const setSelectedJudicialCaseId = (caseId: string) => ({
  type: ActionType.SET_SELECTED_JUDICIAL_CASE_ID,
  payload: caseId,
});

export const loadJudicialCases = (areaId: number) => ({
  type: ActionType.LOAD_JUDICIAL_CASES,
  payload: areaId,
});

export const setJudicialCases = (list: IJudicialCasesItem[]) => ({
  type: ActionType.SET_JUDICIAL_CASES,
  payload: list,
});

export const deleteJudicialCases = (id: number) => ({
  type: ActionType.DELETE_JUDICIAL_CASES,
  payload: id,
});

export const addJudicialCases = (obj: IJudicialCasesItemAdd) => {
  return {
    type: ActionType.ADD_JUDICIAL_CASES,
    payload: obj,
  }
};
