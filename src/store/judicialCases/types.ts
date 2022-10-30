import { IResponse } from 'models/response';

export interface IJudicialCases {
  listJudicialCases: IJudicialCasesItem[];
  isPreloader: boolean;
  modalCondition: boolean;
  currentItem: {};
  selectedCaseId?: string;
  selectedCaseNumber?: string;
  isLoading: boolean;
}

export interface IJudicialCasesItemPeople {
  id?: string;
  birthday: string;
  lastname: string;
  name: string;
  surname: string;
  phone: string;
  reg_address: string;
  res_address: string;
  person_type?: string;
  type: number;
}

export interface IJudicialCasesItemCompany {
  id?: string;
  inn: number | string;
  ogrn: number | string;
  company: string;
  legal_address: string;
  mailing_address: string;
  kpp: number | string;
  pc: string;
  bank: string;
  bic: string;
  kc: string;
  person_type?: string;
  type: number;
}



export type IJudicialCasesItemType =
  | IJudicialCasesItemPeople
  | IJudicialCasesItemCompany;

export interface IJudicialCasesItem {
  id?: string | null;
  uid: string;
  case_id: string;
  plaintiff: IJudicialCasesItemType;
  defendant: IJudicialCasesItemType;
  start: string;
  end: string;
  plaintiff_type?: 1 | 0;
  defendant_type?: 1 | 0;
  area_id: number;
}

export interface IJudicialCasesItemAdd {
  id?: number;
  uid: string;
  case_id: string;
  plaintiff: IJudicialCasesItemType;
  defendant: IJudicialCasesItemType;
  start: string;
  end: string;
  area_id: number;
}



// export type WrapResponseAddJudicialCase = IResponse<IJudicialCasesItem>;
export type WrapResponseGetListJudicialCases = IResponse<IJudicialCasesItem[]>;
export type WrapResponseAddJudicialCase = IResponse<IJudicialCasesItemAdd>;
