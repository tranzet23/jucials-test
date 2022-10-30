import { ActionType } from './actionTypes';

export const changeTheme = (theme: string) => ({
  type: ActionType.UPDATE_THEME,
  payload: theme,
});
