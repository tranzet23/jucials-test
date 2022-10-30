import { IDocTemplate, IDocTemplateBlock } from './types';

export enum ActionType {
  FETCH_DOC_TEMPLATES = 'FETCH_DOC_TEMPLATES',
  FETCH_DOC_TEMPLATE = 'FETCH_DOC_TEMPLATE',
  SET_DOC_TEMPLATES = 'SET_DOC_TEMPLATES',
  SET_DOC_TEMPLATE = 'SET_DOC_TEMPLATE',
  ADD_DOC_TEMPLATE = 'ADD_DOC_TEMPLATE',
  UPDATE_DOC_TEMPLATE = 'UPDATE_DOC_TEMPLATE',
  DELETE_DOC_TEMPLATE = 'DELETE_DOC_TEMPLATE',
  SET_REDIRECT = 'SET_REDIRECT',
  SET_DOC_TEMPLATE_BLOCKS = 'SET_DOC_TEMPLATE_BLOCKS',
  SET_SELECTED_TEMPLATE = 'SET_SELECTED_TEMPLATE',
}

export interface IFetchDocTemplates {
  type: ActionType.FETCH_DOC_TEMPLATES;
  payload?: any;
}
export interface IFetchDocTemplate {
  type: ActionType.FETCH_DOC_TEMPLATE;
  payload: number;
}

export interface ISetRedirect {
  type: ActionType.SET_REDIRECT;
  payload: boolean;
}

export interface ISetDocTemplates {
  type: ActionType.SET_DOC_TEMPLATES;
  payload: Array<IDocTemplate | IDocTemplateBlock>;
}
export interface ISetDocTemplatesBlocks {
  type: ActionType.SET_DOC_TEMPLATE_BLOCKS;
  payload: any;
}
export interface ISetDocTemplate {
  type: ActionType.SET_DOC_TEMPLATE;
  payload: IDocTemplate;
}

export interface IAddDocTemplate {
  type: ActionType.ADD_DOC_TEMPLATE;
  payload: any;
}

export interface IUpdateDocTemplate {
  type: ActionType.UPDATE_DOC_TEMPLATE;
  payload: any;
}
export interface IDeleteDocTemplate {
  type: ActionType.DELETE_DOC_TEMPLATE;
  payload: any;
}
export interface ISetSelectedTemplate {
  type: ActionType.SET_SELECTED_TEMPLATE;
  payload: string;
}
export type Action =
  | IFetchDocTemplates
  | ISetDocTemplates
  | IAddDocTemplate
  | IUpdateDocTemplate
  | IDeleteDocTemplate
  | IFetchDocTemplate
  | ISetDocTemplate
  | ISetRedirect
  | ISetDocTemplatesBlocks
  | ISetSelectedTemplate;
