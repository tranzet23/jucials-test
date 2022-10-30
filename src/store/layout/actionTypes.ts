export enum ActionType {
  UPDATE_THEME = 'UPDATE_THEME',
}

export interface IUpdateTheme {
  type: ActionType.UPDATE_THEME;
  payload: string;
}

export type Action = IUpdateTheme;
