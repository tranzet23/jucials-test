import { ActionType } from './actionTypes';

export const fetchDocTemplates = (id: any = null) => ({
  type: ActionType.FETCH_DOC_TEMPLATES,
  payload: id,
});
export const fetchDocTemplate = (id: number) => ({
  type: ActionType.FETCH_DOC_TEMPLATE,
  payload: id,
});
export const setDocTemplates = data => ({
  type: ActionType.SET_DOC_TEMPLATES,
  payload: data,
});
export const setDocTemplate = data => ({
  type: ActionType.SET_DOC_TEMPLATE,
  payload: data,
});

export const setDocTemplateBlocks = data => ({
  type: ActionType.SET_DOC_TEMPLATE_BLOCKS,
  payload: data,
});

export const addDocTemplate = data => ({
  type: ActionType.ADD_DOC_TEMPLATE,
  payload: data,
});
export const updateDocTemplate = data => ({
  type: ActionType.UPDATE_DOC_TEMPLATE,
  payload: data,
});
export const deleteDocTemplate = data => ({
  type: ActionType.DELETE_DOC_TEMPLATE,
  payload: data,
});

export const setRedirect = condition => ({
  type: ActionType.SET_REDIRECT,
  payload: condition,
});

export const setSelectedTemplate = (name: string | null) => ({
  type: ActionType.SET_SELECTED_TEMPLATE,
  payload: name,
});
