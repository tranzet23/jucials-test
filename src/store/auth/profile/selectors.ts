import { createSelector } from 'reselect';
import { RootState } from 'store/reducers';
import { IProfile } from './types';

const getState = (rootState: RootState) => {
  return rootState.Profile;
};

export const getAreaId = createSelector(
  getState,
  (state: IProfile) => state.areaId,
);
export const getUserId = createSelector(
  getState,
  (state: IProfile) => state.userId,
);
