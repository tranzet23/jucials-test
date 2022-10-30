import { IResponse } from 'models/response';
export type ModesHearing = 'none' | 'planned' | 'recorning' | 'delete';
export type SetDocument = (
  document: IDocument | undefined,
  documentText: string | undefined,
) => void;

export interface IJudicialCaseData {
  id: string;
  uid: string;
  plaintiff?: IParticipants;
  plaintiff_type: 0;
  defendant?: IParticipants;
  defendant_type: 0;
  start: string;
  end: string;
  area_id: number;
  case_id: string;
  participants: IParticipants[];
}

export interface IDocumentation {
  id: number;
  type: string;
}

export interface IParticipants {
  channel: string;
  id: number;
  name: string;
  lastname: string;
  surname: string;
  type: string;
  color: string;
  timeEnd: number;
  timeStart: number;
}

export interface IDocument {
  id: number;
  name: string;
  path: string;
  type: string;
}

export interface IJudicialHearingData {
  id?: string;
  date: string;
  time: string;
  result: ModesHearing;
  participants: IParticipants[];
  documents?: IDocument[];
}

export interface IItemHearings {
  number: string;
  id: number;
  result: string;
  time: string;
  date: string;
  participants: IParticipants[];
  documentation: IDocumentation[];
}

export interface IJudicialHearing {
  modeHearing: ModesHearing;
  hearingStatus: ModesHearing;
  listHearings?: IItemHearings[];
  errorGetListHearings: string;
  isUploadingAudio: boolean;
  dataHearing?: IJudicialHearingData;
  caseInfo?: IJudicialCaseData;
  selectedHearingId?: string;
  selectedHearingNumber?: number;
  currentDocument?: IDocument;
  selectedDocument: null | number;
  documentText?: string;
}

export interface IJudicialAndHearingData {
  date: string;
  time: string;
  case_id: string;
  documents: IDocument[];
}

export interface IJudicialAndHearingData {
  date: string;
  time: string;
  case_id: string;
  documents: IDocument[];
}

//-------

export type WrapResponseAddJudicialHearings = IResponse<{ id: string }>;

export type WrapResponseGetInfoJudicialHearing =
  IResponse<IDataAddJudicialHearingRequest>;

export type WrapResponseGetInfoJudicialCase = IResponse<IJudicialCaseData>;

export type WrapResponseGetListJudicialHearings = IResponse<IItemHearings[]>;

export interface IDataLoadFileRequest {
  file: any;
  hearingId: string;
}

export interface IDataLoadDocxFileRequest {
  file: any;
  hearingId: string;
  fileName: string;
  type: string;
}

export interface IDataInfoJudicialHearingRequest {
  caseId: string;
  hearingId: string;
}

export type IDataAddJudicialHearingRequest = IJudicialHearingData;

export type IDataUpdateParticipantsRequest = {
  meeting_id: string;
  participants: IParticipants[];
};

export interface IDataGetJudicialCaseRequest {
  areaId: number;
  caseId: string;
}

export type IDataUpdateJudicialCaseRequest = IJudicialCaseData;
