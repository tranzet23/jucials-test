import {IJudicialCases, IJudicialCasesItemAdd} from './types';

export enum ActionType {
    SET_SELECTED_JUDICIAL_CASE_ID = 'SET_SELECTED_JUDICIAL_CASE_ID',
    LOAD_JUDICIAL_CASES = 'LOAD_JUDICIAL_CASES',
    SET_JUDICIAL_CASES = 'SET_JUDICIAL_CASES',
    DELETE_JUDICIAL_CASES = 'DELETE_JUDICIAL_CASES',
    ADD_JUDICIAL_CASES = 'ADD_JUDICIAL_CASES',
}

export interface ISetSelectedJudicialCaseId {
    type: ActionType.SET_SELECTED_JUDICIAL_CASE_ID;
    payload: string;
}

export interface ISetJudicialCases {
    type: ActionType.SET_JUDICIAL_CASES;
    payload: IJudicialCases[];
}

export interface ILoadJudicialCases {
    type: ActionType.LOAD_JUDICIAL_CASES;
    payload: number;
}

export interface IDeleteJudicialCases {
    type: ActionType.DELETE_JUDICIAL_CASES;
    payload: { id: number };
}

export interface IAddJudicialCases {
    type: ActionType.ADD_JUDICIAL_CASES;
    payload: IJudicialCasesItemAdd;
}

export type Action =
    | ISetSelectedJudicialCaseId
    | ISetJudicialCases
    | ILoadJudicialCases
    | IDeleteJudicialCases
    | IAddJudicialCases;
