import { Action, ActionType } from './actionTypes';
import { IDocTemplates } from './types';

const initState: IDocTemplates = {
  templates: [],
  currentTemplate: null,
  redirect: false,
  selectedTemplate: null,
};

const DocTemplatesReducer = (state = initState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_DOC_TEMPLATES:
      return { ...state, templates: action.payload };
    case ActionType.SET_REDIRECT:
      return { ...state, redirect: action.payload };
    case ActionType.SET_DOC_TEMPLATE:
      return { ...state, currentTemplate: action.payload };
    case ActionType.SET_DOC_TEMPLATE_BLOCKS:
      const newCurrentTemplate = {
        ...state.currentTemplate,
        blocks: !action?.payload ? [] : [...action.payload],
      };
      return {
        ...state,
        currentTemplate: newCurrentTemplate,
      };
    case ActionType.SET_SELECTED_TEMPLATE:
      return {
        ...state,
        selectedTemplate: action.payload,
      };
    case ActionType.ADD_DOC_TEMPLATE:
      return { ...state, blobUrl: action.payload };
    default:
      return state;
  }
};

export default DocTemplatesReducer;
