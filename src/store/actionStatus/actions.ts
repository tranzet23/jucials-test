import { ActionType } from './actionTypes';
import { IActionStatusReducer } from './types';

export const setActionStatus = (data: IActionStatusReducer) => ({
  type: ActionType.SET_ACTION_STATUS,
  payload: data,
});
