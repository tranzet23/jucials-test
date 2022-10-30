import { createSelector } from 'reselect';
import { RootState } from 'store/reducers';

const getState = (rootState: RootState) => {
  return rootState.DocTemplates;
};

export const getCurrentTemplateId = createSelector(
  getState,
  (state: any) => state.currentTemplate!.template_id || -1,
);
export const getFirstTemplate = createSelector(
  getState,
  (state: any) => state?.templates[0]?.template_id || null,
);
export const getSelectedTemplateId = createSelector(
  getState,
  (state: any) => state?.selectedTemplate,
);
