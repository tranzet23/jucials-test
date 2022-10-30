import { IActionStatusReducer } from './types';

export enum ActionType {
  SET_ACTION_STATUS = 'SET_ACTION_STATUS',
}

export interface ISetActionStatus {
  type: ActionType.SET_ACTION_STATUS;
  payload: IActionStatusReducer;
}

export type Action = ISetActionStatus;
