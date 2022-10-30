import { createSelector } from 'reselect';
import { RootState } from 'store/reducers';
import { IJudicialCases } from './types';

const getState = (rootState: RootState) => {
  return rootState.JudicialCases;
};

export const getCaseNumber = createSelector(
  getState,
  (state: IJudicialCases) => state.selectedCaseNumber || '_',
);

export const getCaseId = createSelector(
  getState,
  (state: IJudicialCases) => state.selectedCaseId || '_',
);
