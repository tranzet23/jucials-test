import { createSelector } from 'reselect';
import { RootState } from 'store/reducers';
import { getCaseNumber } from '../judicialCases/selectors';
import { getSecondsAsTime } from 'utils/app_helper';
import { DEFAULT_COLORS } from 'constants/app_сonstants';
import { IJudicialHearing, IParticipants } from './types';

const getState = (rootState: RootState) => {
  return rootState.JudicialHearing;
};

export const getHearingId = createSelector(
  getState,
  (state: IJudicialHearing) => state.selectedHearingId || '_',
);

export const selectedHearingNumber = createSelector(
  getState,
  (state: IJudicialHearing) => state.selectedHearingNumber || '_',
);

export const getDataHearingByChannel = createSelector(
  getState,
  (state: IJudicialHearing) => {
    const dataHearing = state.dataHearing;

    if (dataHearing) {
      const participants = dataHearing?.participants || [];

      const arrChannels = participants
        .map(participant => participant.channel)
        .filter(channel => channel !== '0');
      for (var i = arrChannels.length - 1; i >= 0; i--) {
        if (
          arrChannels.indexOf(arrChannels[i]) !==
          arrChannels.lastIndexOf(arrChannels[i])
        ) {
          return undefined;
        }
      }
      return { ...dataHearing, participants };
    }

    return undefined;
  },
);

export const getDataHearingSpecificTime = createSelector(
  getState,
  (state: IJudicialHearing) => {
    const dataHearing = state.dataHearing;

    if (dataHearing) {
      let participants: IParticipants[] = [];
      if (dataHearing?.participants) {
        participants = dataHearing?.participants.map((obj: any) => ({
          channel: '0',
          ...obj,
          timeStart: getSecondsAsTime(obj.timeStart),
          timeEnd: getSecondsAsTime(obj.timeEnd),
        }));
      }

      return {
        ...dataHearing,
        participants,
      };
    }

    return undefined;
  },
);

export const getDataHearing = createSelector(
  getState,
  (state: IJudicialHearing) => {
    const dataHearing = state.dataHearing;

    if (dataHearing) {
      return { ...dataHearing, participants: dataHearing?.participants || [] };
    }

    return undefined;
  },
);

export const getRegions = createSelector(
  getState,
  (state: IJudicialHearing) => {
    const dataHearing = state.dataHearing;

    if (dataHearing) {
      var test = dataHearing?.participants
        ?.filter(
          participant =>
            participant.channel !== '0' &&
            participant.color !== DEFAULT_COLORS[0] &&
            participant.timeStart !== participant.timeEnd,
        )
        .map((participant, item) => ({
          id: participant.id,
          color: participant.color || DEFAULT_COLORS[0],
          channelIdx: +participant.channel - 1,
          end: participant.timeEnd,
          start: participant.timeStart,
          data: {
            item,
            ...participant,
          },
          // resize: false,
          // drag: false,
        }));

      return test;
    }
    return [];
  },
);

export const getCaseInfo = createSelector(
  getState,
  (state: IJudicialHearing) => {
    const caseInfo = state.caseInfo;

    if (caseInfo && caseInfo?.case_id) {
      return caseInfo;
    }

    return undefined;
  },
);

export const getCaseInfoDataForEdit = createSelector(
  getState,
  (state: IJudicialHearing) => {
    const caseInfo = state.caseInfo;

    if (caseInfo && caseInfo?.case_id) {
      return {
        id: caseInfo.id,
        uid: caseInfo.uid,
        plaintiff: caseInfo.plaintiff,
        plaintiff_type: caseInfo.plaintiff_type,
        defendant: caseInfo.defendant,
        defendant_type: caseInfo.defendant_type,
        start: caseInfo.start,
        end: caseInfo.end,
        area_id: caseInfo.area_id,
        case_id: caseInfo.case_id,
      };
    }
    return undefined;
  },
);

export const getCaseAndHearingData = createSelector(
  getState,
  (state: IJudicialHearing) => {
    const dataHearing = state.dataHearing;
    const caseInfo = state.caseInfo;

    if (dataHearing && caseInfo && caseInfo?.case_id) {
      return {
        date: dataHearing.date,
        time: dataHearing.time,
        case_id: caseInfo.case_id,
        documents: dataHearing.documents,
      };
    }

    return undefined;
  },
);

export const getTilteWithHearingIdAndCaseName = (state: RootState) => {
  const caseNaumber = getCaseNumber(state);
  // @ts-ignore
  const hearingId = state.JudicialHearing.selectedHearingId || '_';
  return `Заседание №${hearingId} по делу №${caseNaumber}`;
};

// export const getDocument = (createSelector(
//   getState,
//   (state: IJudicialHearing) => {
//     const documents = state.dataHearing?.documents
//     const selectedDocument = state.selectedDocument
//     if (!documents) return undefined
//     for (let doc of documents) {
//       if (doc.id === selectedDocument) {
//         return doc
//       }
//     }
//   }
// ))

export const getSelectedDocument = createSelector(
  getState,
  (state: IJudicialHearing) => state.selectedDocument,
);
