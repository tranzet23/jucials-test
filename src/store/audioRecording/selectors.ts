import { createSelector } from 'reselect';
import { RootState } from 'store/reducers';
import { IAudioRecording, IDataAboutBusyDevice } from './types';

const getState = (rootState: RootState) => {
  return rootState.AudioRecording;
};

export const getNameRecord = createSelector(
  getState,
  (state: IAudioRecording) => {
    return state.recordName;
  },
);

export const getStatus = createSelector(
  getState,
  (state: IAudioRecording) => state.status,
);

export const getStatusForRecord = createSelector(
  getState,
  (state: IAudioRecording) => {
    if (state.dataAboutBusyDevice?.isBusy) {
      return 'busy';
    }
    return state.status;
  },
);

export const getDataAboutBusyDevice = createSelector(
  getState,
  (state: IAudioRecording): IDataAboutBusyDevice => {
    if (state.dataAboutBusyDevice) {
      return state.dataAboutBusyDevice;
    }
    return { caseId: '', meetingId: '', isBusy: false };
  },
);
