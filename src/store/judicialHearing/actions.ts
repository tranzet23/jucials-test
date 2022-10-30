import { RouteComponentProps } from 'react-router-dom';
import { ActionType } from './actionTypes';
import {
  ModesHearing,
  IItemHearings,
  IJudicialHearingData,
  IJudicialCaseData,
  IDataLoadFileRequest,
  IParticipants,
  IDataLoadDocxFileRequest, IDocument,
} from './types';
export type History = RouteComponentProps['history'];

export const setSelectedJudicialHearingId = (hearingId: string) => ({
  type: ActionType.SET_SELECTED_HEARING_ID,
  payload: hearingId,
});

export const setSelectedHearingNumber = (number: number) => ({
  type: ActionType.SET_SELECTED_HEARING_NUMBER,
  payload: number,
});

export const getListHearings = () => ({
  type: ActionType.GET_LIST_HEARINGS,
});

export const setListHearings = (listHearings?: IItemHearings[]) => ({
  type: ActionType.SET_LIST_HEARINGS,
  payload: listHearings,
});

export const addJudicialHearing = (
  data: IJudicialHearingData,
  history: History,
) => ({
  type: ActionType.ADD_JUDICIAL_HEARING,
  payload: { data, history },
});

export const deleteJudicialHearing = (id: string) => ({
  type: ActionType.DELETE_JUDICIAL_HEARING,
  payload: id,
});

export const setErrorGetListHearings = (message: string) => ({
  type: ActionType.SET_ERROR_GET_LIST_HEARINGS,
  payload: message,
});

//----

export const getInfoJudicialHearing = () => ({
  type: ActionType.GET_INFO_HEARING,
});

export const setInfoJudicialHearing = (data?: IJudicialHearingData) => ({
  type: ActionType.SET_INFO_HEARING,
  payload: data,
});

//----

export const getJudicialCaseInfo = () => ({
  type: ActionType.GET_INFO_HEARING_CASE,
});

export const setJudicialCaseInfo = (data?: IJudicialCaseData) => ({
  type: ActionType.SET_INFO_HEARING_CASE,
  payload: data,
});

export const updateJudicialCaseInfo = (data: IJudicialCaseData) => ({
  type: ActionType.UPDATE_INFO_HEARING_CASE,
  payload: data,
});

//----

export const setIsUploadAudio = (isUploadingAudio: boolean) => ({
  type: ActionType.IS_LOADIND_AUDIO,
  payload: isUploadingAudio,
});

export const addAudioFile = (file: IDataLoadFileRequest, history: History) => ({
  type: ActionType.ADD_AUDIO_FILE,
  payload: { file, history },
});

//----

export const addDocxFile = (data: IDataLoadDocxFileRequest) => ({
  type: ActionType.ADD_DOCX_FILE,
  payload: data,
});

//----

export const updateModeHearing = (mode: ModesHearing) => ({
  type: ActionType.UPDATE_MODE_HEARING,
  payload: mode,
});

export const updateHearingStatus = (status: ModesHearing) => ({
  type: ActionType.UPDATE_HEARING_STATUS,
  payload: status,
})

//----
export const updateParticipants = (participants: IParticipants[]) => ({
  type: ActionType.UPDATE_PARTICIPANTS,
  payload: participants,
});

//----

export const setDocument = (document: IDocument | undefined, documentText: string | undefined = undefined) => ({
  type: ActionType.SET_DOCUMENT,
  payload: {document, documentText}
});

export const setSelectedDocument = (id: number | null) => ({
  type: ActionType.SET_SELECTED_DOCUMENT,
  payload: id
})

export const updateDocumentText = (text: Blob, id: number) => ({
  type: ActionType.UPDATE_DOCUMENT_TEXT,
  payload: { text, id }
})

export const deleteDocument = (id: number) => ({
  type: ActionType.DELETE_DOCUMENT,
  payload: id
})