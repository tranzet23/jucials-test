import { call, delay, put, select, takeEvery } from 'redux-saga/effects';
import {
  ActionType,
  IAddDocTemplate,
  IDeleteDocTemplate,
  IFetchDocTemplate,
  IFetchDocTemplates,
  IUpdateDocTemplate,
} from './actionTypes';
import DocTemplates from './services';
import { AxiosResponse } from 'axios';
import { IResponse } from 'models/response';
import { IDocTemplate } from './types';
import { getFirstTemplate, getUserId } from 'store/selectors';
import {
  fetchDocTemplate,
  fetchDocTemplates,
  setDocTemplate,
  setDocTemplateBlocks,
  setDocTemplates,
  setRedirect,
  setSelectedTemplate,
} from './actions';
import { getSelectedTemplateId } from 'store/docTemplates/selectors';

function* fetchAndSetBlockTemplates(templateId) {
  const res = yield call(
    DocTemplates.fetchDocTemplates,
    templateId,
    'template',
  );

  yield put(setDocTemplateBlocks(res.data.data.blocks));
}

export function* fetchDocTemplatesSaga({ payload }: IFetchDocTemplates) {
  try {
    const res: AxiosResponse<IResponse<IDocTemplate[]>> = yield call(
      DocTemplates.fetchDocTemplates,
      payload,
    );

    yield put(setDocTemplates(res.data.data));

    // yield put(setDocTemplates(res.data.data));
  } catch (e) {
    yield put(setDocTemplates([]));
  }
}

export function* fetchDocTemplateSaga({ payload }: IFetchDocTemplate) {
  try {
    if (+payload) {
      const res: AxiosResponse<IResponse<IDocTemplate[]>> = yield call(
        DocTemplates.fetchDocTemplates,
        payload,
        'template',
      );

      yield put(setDocTemplate(res.data.data));
    }

    // yield put(setDocTemplates(res.data.data));
  } catch (e) {}
}

export function* addDocTemplate({ payload }: IAddDocTemplate) {
  try {
    const userId = yield select(getUserId);

    const res: AxiosResponse<IResponse<any>> = yield call(
      DocTemplates.addDocTemplate,
      { ...payload, userId },
    );

    if (!payload.templateId) {
      yield put(setSelectedTemplate(res.data.data.template_id));
      yield put(setRedirect(true));
      yield delay(200);
      yield put(setRedirect(false));
    } else {
      yield put(fetchDocTemplate(payload.templateId));
    }

    // yield put(setDocTemplates(res.data.data));
  } catch (e) {
    console.log(e);
  }
}
export function* updateDocTemplate({ payload }: IUpdateDocTemplate) {
  try {
    // const res: AxiosResponse<IResponse<any>> = yield call(
    //   DocTemplates.updateDocTemplate,
    //   payload,
    // );
    yield call(DocTemplates.updateDocTemplate, payload);
    const userId = yield select(getUserId);

    if (payload.templateId) {
      yield fetchAndSetBlockTemplates(payload.templateId);
    } else {
      yield put(fetchDocTemplate(payload.id));
      yield put(fetchDocTemplates(userId));
    }
    // yield put(setDocTemplates(res.data.data));
  } catch (e) {
    console.log(e);
  }
}
export function* deleteDocTemplate({ payload }: IDeleteDocTemplate) {
  try {
    const firstTemplateId = yield select(getFirstTemplate);
    const templateId = yield select(getSelectedTemplateId);

    if (firstTemplateId === +payload) {
      yield put(setDocTemplates([]));
    }
    yield call(DocTemplates.deleteDocTemplate, payload);

    if (templateId) {
      yield fetchAndSetBlockTemplates(templateId);
    } else {
      yield put(setSelectedTemplate(null));
      yield put(setRedirect(true));
      yield delay(200);
      yield put(setRedirect(false));
    }
  } catch (e) {}
}

function* DocTemplatesSaga() {
  yield takeEvery(ActionType.FETCH_DOC_TEMPLATES, fetchDocTemplatesSaga);
  yield takeEvery(ActionType.FETCH_DOC_TEMPLATE, fetchDocTemplateSaga);
  yield takeEvery(ActionType.ADD_DOC_TEMPLATE, addDocTemplate);
  yield takeEvery(ActionType.UPDATE_DOC_TEMPLATE, updateDocTemplate);
  yield takeEvery(ActionType.DELETE_DOC_TEMPLATE, deleteDocTemplate);
}

export default DocTemplatesSaga;
