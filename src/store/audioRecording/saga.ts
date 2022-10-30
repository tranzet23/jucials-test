import {
  call,
  put,
  takeEvery,
  select,
  delay,
  race,
  take,
} from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { getMessageFromError } from 'utils/app_helper';

import { setActionStatus, getSoundFile } from '../actions';
import { IChangeStatusRecording, ActionType } from './actionTypes';
import {
  WrapResponseSetStatusAudioRecording,
  WrapResponseGetStatusAudioRecording,
  WrapResponseGetDataAboutBusyDevice,
  IDataSetStatusAudioRecordingRequest,
} from './types';
import {
  setDataAudioRecording as setDataAudioRecordingAction,
  setDataAboutBusyDevice,
  getStatusAudioRecording,
} from './actions';
import {
  getNameRecord,
  getHearingId,
  getCaseId,
  getStatusForRecord,
} from 'store/selectors';
import AudioRecording from './services';

function* setDataAudioRecording({
  payload: { status, history },
}: IChangeStatusRecording) {
  try {
    const nameRecord = yield select(getNameRecord);
    const hearingId = yield select(getHearingId);
    const caseId = yield select(getCaseId);
    const date = new Date().toLocaleDateString();

    const data: IDataSetStatusAudioRecordingRequest = {
      status,
      recordName: nameRecord,
      meeting_id: hearingId,
      case_id: caseId,
      date,
    };

    const response: AxiosResponse<WrapResponseSetStatusAudioRecording> =
      yield call(AudioRecording.setStatusAudioRecording, data);

    yield put(
      setDataAudioRecordingAction({
        ...response.data.data,
        status: data.status,
      }),
    );

    if (data.status === 'stop') {
      yield put(getStatusAudioRecording());
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

function* isDeviceBusy() {
  const status = yield select(getStatusForRecord);

  if (status === 'run' || status === 'pause' || status === 'stop') {
    // так как это статусы по микрофону
    return false;
  }

  try {
    const response: AxiosResponse<WrapResponseGetDataAboutBusyDevice> =
      yield call(AudioRecording.checkIsDeviceBusy);

    yield put(setDataAboutBusyDevice({ ...response.data.data }));
  } catch (error) {
    yield put(
      setDataAboutBusyDevice({ meetingId: '', caseId: '', isBusy: false }),
    );
  }
}

// !!!!!!!!!!!!! вынести логику
function* checkStatusAudio() {
  const hearingId = yield select(getHearingId);

  try {
    const response: AxiosResponse<WrapResponseGetStatusAudioRecording> =
      yield call(AudioRecording.getStatusAudio, hearingId);
    if (
      response.data.data.status === 'processing' ||
      response.data.data.status === 'stop'
    ) {
      yield put({ type: ActionType.START_STATUS_POLLING });
    }

    yield put(
      setDataAudioRecordingAction({
        recordName: response.data.data.name,
        status: response.data.data.status,
      }),
    );

    if (
      response.data.data.status === 'ready' ||
      response.data.data.status === 'loaded'
    ) {
      yield put(getSoundFile());
    }

    if (response.data.data.status === null) {
      yield put(
        setDataAudioRecordingAction({
          recordName: '',
          status: 'needLoad',
        }),
      );
    } else {
      yield put(
        setDataAudioRecordingAction({
          recordName: response.data.data.name,
          status: response.data.data.status,
        }),
      );
    }
  } catch (error) {}
}

export function* isAudioComplete() {
  const hearingId = yield select(getHearingId);
  const status = yield select(getStatusForRecord);

  while (true) {
    try {
      const response: AxiosResponse<WrapResponseGetStatusAudioRecording> =
        yield call(AudioRecording.getStatusAudio, hearingId);
      if (
        response.data.data.status === 'processing' ||
        response.data.data.status === 'stop'
      ) {
        yield delay(4000);

        if (status !== response.data.data.status) {
          yield put(
            setDataAudioRecordingAction({
              recordName: response.data.data.name,
              status: response.data.data.status,
            }),
          );
        }
      } else {
        if (
          response.data.data.status === 'ready' ||
          response.data.data.status === 'loaded'
        ) {
          yield put(getSoundFile());
        }

        yield put(
          setDataAudioRecordingAction({
            recordName: response.data.data.name,
            status: response.data.data.status,
          }),
        );
        yield put({ type: ActionType.CANCEL_STATUS_POLLING });
      }
    } catch (err) {
      yield put({ type: ActionType.CANCEL_STATUS_POLLING });
    }
  }
}

function* statusAudioWatchWorker() {
  yield race({
    //4. Start the polling worker
    task: call(isAudioComplete),
    //5. Start a take effect waiting for the cancel action.
    cancel: take(ActionType.CANCEL_STATUS_POLLING),
  });
}

function* AudioRecordingtSaga() {
  yield takeEvery(
    ActionType.CHANGE_STATUS_AUDIO_RECORDING,
    setDataAudioRecording,
  );

  yield takeEvery(ActionType.GET_STATUS_AUDIO_RECORDING, checkStatusAudio);
  yield takeEvery(ActionType.START_STATUS_POLLING, statusAudioWatchWorker);
  yield takeEvery(ActionType.CHECK_DATA_ABOUT_BUSY_DEVICE, isDeviceBusy);
}

export default AudioRecordingtSaga;
