import { createSelector } from 'reselect';
import { RootState } from 'store/reducers';
import { getTimeAsSecond } from 'utils/app_helper';
import { DEFAULT_COLORS } from 'constants/app_сonstants';
import { ITranscription, ITranscriptionTextData } from './types';
import { IJudicialHearingData, IParticipants } from '../judicialHearing/types';

const getState = (rootState: RootState) => {
  return rootState.Transcription;
};

const getStatusAudioRecording = (rootState: RootState) => {
  return rootState.AudioRecording.status;
};

export const getStatusAudio = (state: RootState) => {
  const statusAudioRecording = getStatusAudioRecording(state);

  if (statusAudioRecording === 'none' || !statusAudioRecording) {
    return getSoundFileStatus(state);
  }
  return statusAudioRecording;
};

export const getSoundFileStatus = createSelector(
  getState,
  (state: ITranscription) => state.soundFileStatus,
);

export const getSoundFile = createSelector(
  getState,
  (state: ITranscription) => state.soundFilePath || '',
);

export const getAudioId = createSelector(
  getState,
  (state: ITranscription) => state.soundFileId,
);

export const getTranscribationStatus = createSelector(
  getState,
  (state: ITranscription) => state.transcribationStatus,
);

export const getTranscribationFile = createSelector(
  getState,
  (state: ITranscription) => state.transcribationText,
);

export const getStatusIsUseDiarization = createSelector(
  getState,
  (state: ITranscription) => state.isUseDiarization,
);

export const getRegionsTranscrib = (state: any) => {
  const transcribationData: ITranscriptionTextData[] =
    state.Transcription.transcribationText;
  const dataHearing: IJudicialHearingData = state.JudicialHearing.dataHearing;

  if (transcribationData && dataHearing?.participants) {
    var test = transcribationData.map((transcribItem, item) => {
      const speacterData: IParticipants | undefined =
        dataHearing?.participants.find(
          participant => participant.channel === transcribItem.speakerTag,
        );

      return {
        color: speacterData?.color || DEFAULT_COLORS[0],
        // channelIdx: +participant.channel - 1,
        start: getTimeAsSecond(transcribItem.startTime),
        end: getTimeAsSecond(transcribItem.endTime),
        resize: false,
        drag: false,
      };
    });
    return test;
  }
  return [];
};
