import {
  call,
  put,
  take,
  select,
  cancel,
  fork,
  race,
  takeEvery,
  delay,
} from 'redux-saga/effects';
import {
  WrapDataCheckTranscribation,
  WrapDataGetSoundFileResponse,
} from './types';
import { AxiosResponse } from 'axios';
import { ActionType } from './actionTypes';
import {
  getAudioId,
  getHearingId,
  getStatusIsUseDiarization,
} from 'store/selectors';
import { setDataAudioRecording } from 'store/actions';
import { setSoundFile, setChannels } from './actions';
import Transcription from './services';

function* getSoundFile(signal: AbortSignal) {
  try {
    const hearingId = yield select(getHearingId);

    const response: AxiosResponse<WrapDataGetSoundFileResponse> = yield call(
      Transcription.fetchSoundFile,
      { id: hearingId, signal },
    );

    yield put(setSoundFile(response.data.data));
    yield put(setChannels(response.data.data.channels));
  } catch (error) {
    yield put(setChannels(undefined));
    yield put(
      setDataAudioRecording({
        recordName: '',
        status: 'needLoad',
      }),
    );
  }
}

function* transcribationStart() {
  const audioId = yield select(getAudioId);
  try {
    const isStartTranscribation = yield call(
      Transcription.checkIsStartTranscribation,
      { id: audioId },
    );

    if (isStartTranscribation === false) {
      yield call(Transcription.startTranscribation, { id: audioId });
    }

    yield race([
      call(transcribationPoll, { transcribationId: audioId }),
      take('STOP_TRANSCRIBATION'),
    ]);
  } catch (error: any) {
    yield put({
      type: ActionType.TRANSCRIBATION_ERROR,
      payload: error.message,
    });
    console.error(error);
  }
}

function* transcribationPoll({ transcribationId }) {
  while (true) {
    try {
      const isUseDiarization = yield select(getStatusIsUseDiarization);
      const response: AxiosResponse<WrapDataCheckTranscribation> = yield call(
        Transcription.checkTranscribation,
        { id: transcribationId },
      );

      // if (response.data.data.finished === 'true') {
      if (response.data.data.isFinished) {
        const transcriptionResponse: any = yield call(
          Transcription.getTranscribation,
          { id: transcribationId, isUseDiarization },
        );
        yield put({
          type: ActionType.STOP_TRANSCRIBATION,
          payload: transcriptionResponse.data.data,
        });
      } else {
        yield delay(4000);
      }
    } catch (error: any) {
      yield put({
        type: ActionType.TRANSCRIBATION_ERROR,
        payload: error.message,
      });
      console.error(error);
      break;
    }
  }
}

function* TranscriptionSaga() {
  let task;
  let abortController = new AbortController();

  yield takeEvery(ActionType.START_TRANSCRIBATION, transcribationStart);

  while (true) {
    yield take(ActionType.GET_SOUND_FILE);

    if (task) {
      abortController.abort();
      yield cancel(task);
      abortController = new AbortController();
    }
    task = yield fork(getSoundFile, abortController.signal);
  }
}

export default TranscriptionSaga;
