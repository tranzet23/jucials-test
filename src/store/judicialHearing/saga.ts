import { put, call, takeEvery, select, delay } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import {
  WrapResponseGetListJudicialHearings,
  WrapResponseGetInfoJudicialHearing,
  WrapResponseGetInfoJudicialCase,
  WrapResponseAddJudicialHearings,
} from './types';
import { AUTH_PROTECTED_ROUTES } from 'navigation/index';
import { getMessageFromError } from 'utils/app_helper';

import { getAreaId, getCaseId, getHearingId } from 'store/selectors';
import { getDataHearing, getSelectedDocument } from 'store/selectors';
import { getStatusAudioRecording, setSelectedDocument } from '../actions';
import {
  ActionType,
  IAddAudioFile,
  IAddJudicialHearing,
  IDeleteJudicialHearing,
  IUpdateParticipantsJudicialHearing,
  IUpdateInfoJudicialCase,
  IAddDocxFile,
  IUpdateDocumentText,
  IUpdateModeHearing,
  IDeleteDocument,
} from './actionTypes';
import {
  setListHearings,
  setIsUploadAudio,
  updateModeHearing as updateModeHearingAction,
  setInfoJudicialHearing,
  setJudicialCaseInfo,
  getListHearings as getListHearingsAction,
  setSelectedJudicialHearingId,
  getInfoJudicialHearing as getInfoJudicialHearingAction,
  setActionStatus,
  setDocument,
} from '../actions';
import JudicialHearings from './services';
import { setRedirect } from 'store/docTemplates/actions';

function* getListHearings() {
  try {
    const caseId = yield select(getCaseId);

    const response: AxiosResponse<WrapResponseGetListJudicialHearings> =
      yield call(JudicialHearings.getListHearings, caseId);

    yield put(setListHearings(response.data.data));
  } catch (error) {
    yield put(
      setActionStatus({
        message: getMessageFromError(error),
        status: 'error',
      }),
    );
  }
}

function* getInfoJudicialHearing() {
  try {
    const caseId = yield select(getCaseId);
    const hearingId = yield select(getHearingId);

    if (caseId && hearingId) {
      const response: AxiosResponse<WrapResponseGetInfoJudicialHearing> =
        yield call(JudicialHearings.getInfoJudicialHearing, {
          caseId,
          hearingId,
        });

      yield put(setInfoJudicialHearing(response.data.data));
    }
  } catch (error) {
    yield put(
      setActionStatus({
        message: getMessageFromError(error),
        status: 'error',
      }),
    );
  }
}

function* addAudioFile({ payload: { file } }: IAddAudioFile) {
  try {
    const hearingId = yield select(getHearingId);

    yield put(setIsUploadAudio(true));
    yield call(JudicialHearings.addAudioFile, { file, hearingId });
    yield put(setIsUploadAudio(false));
    yield put(getStatusAudioRecording());

    //    yield put(setSoundFileStatus('await'));
    // yield put(getSoundFile());
    // history.push(`${AUTH_PROTECTED_ROUTES.AUDIO_PROCESSING.pathTransition}`);
  } catch (error) {
    yield put(
      setActionStatus({
        message: getMessageFromError(error),
        status: 'error',
      }),
    );
  }
}

function* addDocxFile({ payload: data }: IAddDocxFile) {
  try {
    const hearingId = yield select(getHearingId);
    yield call(JudicialHearings.addDocxFile, { ...data, hearingId: hearingId });
    yield put(getInfoJudicialHearingAction());
    yield put(
      setActionStatus({
        message: 'Файл успешно сохранён',
        status: 'success',
      }),
    );
  } catch (error) {
    yield put(
      setActionStatus({
        message: getMessageFromError(error),
        status: 'error',
      }),
    );
  }
}

function* addJudicialHearing({
  payload: { data, history },
}: IAddJudicialHearing) {
  try {
    const response: AxiosResponse<WrapResponseAddJudicialHearings> = yield call(
      JudicialHearings.addJudicialHearing,
      data,
    );
    yield put(setSelectedJudicialHearingId(response.data.data.id));

    if (data.result === 'recorning') {
      //  yield put(setSoundFileStatus('needLoad'));
      history.push(`${AUTH_PROTECTED_ROUTES.TRANSCRIPTION.pathTransition}`);
    }

    if (data.result === 'planned') {
      yield put(getListHearingsAction());
    }
    yield put(updateModeHearingAction('none'));
  } catch (error) {
    yield put(
      setActionStatus({
        message: getMessageFromError(error),
        status: 'error',
      }),
    );
  }
}

function* deleteJudicialHearing({ payload }: IDeleteJudicialHearing) {
  try {
    yield call(JudicialHearings.deleteJudicialHearing, payload);
  } catch (error) {
    yield put(
      setActionStatus({
        message: getMessageFromError(error),
        status: 'error',
      }),
    );
  }
  return;
}

function* updateParticipantsJudicialHearing({
  payload,
}: IUpdateParticipantsJudicialHearing) {
  try {
    const hearingId = yield select(getHearingId);

    yield call(JudicialHearings.updateParticipants, {
      meeting_id: hearingId,
      participants: payload,
    });

    //yield put(getInfoJudicialHearingAction());
    yield put(
      setActionStatus({
        message: 'Обновление прошло успешно ',
        status: 'success',
      }),
    );
  } catch (error) {
    yield put(
      setActionStatus({
        message: getMessageFromError(error),
        status: 'error',
      }),
    );
  }
}

function* getJudicialCaseInfo() {
  try {
    const caseId = yield select(getCaseId);
    const areaId = yield select(getAreaId);
    yield put(setJudicialCaseInfo());

    const response: AxiosResponse<WrapResponseGetInfoJudicialCase> = yield call(
      JudicialHearings.getJudicialCaseInfo,
      { areaId, caseId },
    );
    yield put(setJudicialCaseInfo(response.data.data));
  } catch (error) {
    yield put(
      setActionStatus({
        message: getMessageFromError(error),
        status: 'error',
      }),
    );
  }
}

function* updateInfoJudicialCase({ payload }: IUpdateInfoJudicialCase) {
  try {
    const areaId = yield select(getAreaId);
    yield call(JudicialHearings.updateInfoJudicialCase, {
      ...payload,
      area_id: areaId,
    });

    yield put(
      setActionStatus({
        message: 'Дело успешно обновлено',
        status: 'success',
      }),
    );
  } catch (error) {
    yield put(
      setActionStatus({
        message: getMessageFromError(error),
        status: 'error',
      }),
    );
  }
}

function* updateCurrentDocument() {
  try {
    const hearingData = yield select(getDataHearing);
    const selectedDocument = yield select(getSelectedDocument);
    if (hearingData.documents && selectedDocument) {
      for (let doc of hearingData.documents) {
        if (doc.id === selectedDocument) {
          const response = yield call(JudicialHearings.getHtmlFile, doc.path);
          let docBlob = new Blob([response.data], { type: 'text/html' });
          let htmlString = yield docBlob.text();
          yield put(setDocument(doc, htmlString));
          break;
        }
      }
    } else if (selectedDocument === null) {
      yield put(setDocument(undefined, ''));
    }
  } catch (e) {
    console.log(e);
  }
}

function* updateModeHearing({ payload }: IUpdateModeHearing) {
  try {
    const hearingId = yield select(getHearingId);
    yield call(JudicialHearings.updateJudicialHearingStatus, {
      mode: payload,
      id: hearingId,
    });
    //   yield put(getListHearingsAction())
  } catch (e) {
    console.log(e);
  }
}

function* updateDocumentText({ payload }: IUpdateDocumentText) {
  try {
    yield call(JudicialHearings.updateDocumentText, {
      text: payload.text,
      id: payload.id,
    });
    yield put(getInfoJudicialHearingAction());
    yield put(setRedirect(true));
    yield delay(200);
    yield put(setRedirect(false));
    yield put(setSelectedDocument(payload.id));
  } catch (e) {
    console.log(e);
  }
}

function* deleteDocument({ payload }: IDeleteDocument) {
  try {
    yield call(JudicialHearings.deleteDocument, payload);
    yield put(setRedirect(true));
    yield delay(200);
    yield put(setRedirect(false));
  } catch (e) {
    console.log(e);
  }
}

function* JudicialHearingsSaga() {
  yield takeEvery(ActionType.GET_INFO_HEARING, getInfoJudicialHearing);
  yield takeEvery(ActionType.GET_LIST_HEARINGS, getListHearings);
  yield takeEvery(ActionType.ADD_AUDIO_FILE, addAudioFile);
  yield takeEvery(ActionType.ADD_DOCX_FILE, addDocxFile);
  yield takeEvery(ActionType.ADD_JUDICIAL_HEARING, addJudicialHearing);
  yield takeEvery(ActionType.DELETE_JUDICIAL_HEARING, deleteJudicialHearing);
  yield takeEvery(ActionType.GET_INFO_HEARING_CASE, getJudicialCaseInfo);
  yield takeEvery(
    ActionType.UPDATE_PARTICIPANTS,
    updateParticipantsJudicialHearing,
  );
  yield takeEvery(ActionType.UPDATE_INFO_HEARING_CASE, updateInfoJudicialCase);
  yield takeEvery(ActionType.SET_SELECTED_DOCUMENT, updateCurrentDocument);
  yield takeEvery(ActionType.UPDATE_HEARING_STATUS, updateModeHearing);
  yield takeEvery(ActionType.UPDATE_DOCUMENT_TEXT, updateDocumentText);
  yield takeEvery(ActionType.DELETE_DOCUMENT, deleteDocument);
}

export default JudicialHearingsSaga;
