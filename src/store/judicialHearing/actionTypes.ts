import { RouteComponentProps } from 'react-router-dom';
import {
  ModesHearing,
  IItemHearings,
  IJudicialHearingData,
  IParticipants,
  IJudicialCaseData,
  IDataInfoJudicialHearingRequest, IDocument,
} from './types';
export type History = RouteComponentProps['history'];

export enum ActionType {
  IS_LOADIND_AUDIO = 'IS_LOADIND_AUDIO',
  ADD_AUDIO_FILE = 'ADD_AUDIO_FILE',
  ADD_DOCX_FILE = 'ADD_DOCX_FILE',
  ADD_JUDICIAL_HEARING = 'ADD_JUDICIAL_HEARING',
  DELETE_JUDICIAL_HEARING = 'DELETE_JUDICIAL_HEARING',
  GET_INFO_HEARING = 'GET_INFO_HEARING',
  GET_INFO_HEARING_CASE = 'GET_INFO_HEARING_CASE',
  GET_LIST_HEARINGS = 'GET_LIST_HEARINGS',
  SET_LIST_HEARINGS = 'SET_LIST_HEARINGS',
  SET_ERROR_GET_LIST_HEARINGS = 'SET_ERROR_GET_LIST_HEARINGS',
  SET_INFO_HEARING = 'SET_INFO_HEARING',
  SET_INFO_HEARING_CASE = 'SET_INFO_HEARING_CASE',
  SET_SELECTED_HEARING_ID = 'SET_SELECTED_HEARING_ID',
  SET_SELECTED_HEARING_NUMBER = 'SET_SELECTED_HEARING_NUMBER',
  UPDATE_INFO_HEARING_CASE = 'UPDATE_INFO_HEARING_CASE',
  UPDATE_MODE_HEARING = 'UPDATE_MODE_HEARING',
  UPDATE_HEARING_STATUS = 'UPDATE_HEARING_STATUS',
  UPDATE_PARTICIPANTS = 'UPDATE_PARTICIPANTS',
  SET_DOCUMENT = 'SET_DOCUMENT',
  SET_SELECTED_DOCUMENT = 'SET_SELECTED_DOCUMENT',
  UPDATE_DOCUMENT_TEXT = 'UPDATE_DOCUMENT_TEXT',
  DELETE_DOCUMENT= 'DELETE_DOCUMENT',
}

export interface ISetSelectedJudicialHearingId {
  type: ActionType.SET_SELECTED_HEARING_ID;
  payload: string;
}

interface IGetInfoJudicialHearing {
  type: ActionType.GET_INFO_HEARING;
  payload: IDataInfoJudicialHearingRequest;
}

export interface ISetInfoJudicialHearing {
  type: ActionType.SET_INFO_HEARING;
  payload?: IJudicialHearingData | undefined;
}

export interface IUpdateModeHearing {
  type: ActionType.UPDATE_MODE_HEARING;
  payload: ModesHearing;
}

export interface IUpdateHearingStatus {
  type: ActionType.UPDATE_HEARING_STATUS;
  payload: ModesHearing;
}

export interface ISetListHearings {
  type: ActionType.SET_LIST_HEARINGS;
  payload: IItemHearings[];
}

export interface IAddAudioFile {
  type: ActionType.ADD_AUDIO_FILE;
  payload: { file: any; history: History };
}

export interface IAddDocxFile {
  type: ActionType.ADD_DOCX_FILE;
  payload: any;
}

export interface IAddJudicialHearing {
  type: ActionType.ADD_JUDICIAL_HEARING;
  payload: { data: IJudicialHearingData; history: History };
}

export interface IDeleteJudicialHearing {
  type: ActionType.DELETE_JUDICIAL_HEARING;
  payload: string;
}

interface ISetErrorGetListHearings {
  type: ActionType.SET_ERROR_GET_LIST_HEARINGS;
  payload: string;
}

interface ISetIsUploadAudio {
  type: ActionType.IS_LOADIND_AUDIO;
  payload: boolean;
}

export interface IUpdateParticipantsJudicialHearing {
  type: ActionType.UPDATE_PARTICIPANTS;
  payload: IParticipants[];
}

export interface ISetInfoJudicialCase {
  type: ActionType.SET_INFO_HEARING_CASE;
  payload: IJudicialCaseData;
}

export interface IUpdateInfoJudicialCase {
  type: ActionType.UPDATE_INFO_HEARING_CASE;
  payload: IJudicialCaseData;
}

export interface ISetSelectedJudicialHearingNumber {
  type: ActionType.SET_SELECTED_HEARING_NUMBER;
  payload: number;
}

export interface ISetDocument {
  type: ActionType.SET_DOCUMENT;
  payload: {document: IDocument, documentText: string | undefined};
}

export interface ISetSelectedDocument {
  type: ActionType.SET_SELECTED_DOCUMENT;
  payload: number;
}

export interface IUpdateDocumentText {
  type: ActionType.UPDATE_DOCUMENT_TEXT;
  payload: { text: Blob, id: number };
}

export interface IDeleteDocument {
  type: ActionType.DELETE_DOCUMENT;
  payload: number
}

export type Action =
  | ISetSelectedJudicialHearingId
  | ISetSelectedJudicialHearingNumber
  | IGetInfoJudicialHearing
  | IUpdateModeHearing
  | IUpdateHearingStatus
  | ISetListHearings
  | ISetErrorGetListHearings
  | ISetInfoJudicialHearing
  | ISetIsUploadAudio
  | ISetInfoJudicialCase
  | IDeleteJudicialHearing
  | IUpdateParticipantsJudicialHearing
  | ISetDocument
  | ISetSelectedDocument
  | IUpdateDocumentText
  | IDeleteDocument
  ;