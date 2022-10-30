import { put, call, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { getMessageFromError } from 'utils/app_helper';
import { setActionStatus } from '../actions';
import { WrapDataGetJudicialSectorsResponse } from './types';
import {
  ActionType,
  AddJudicialSector,
  DeleteJudicialSector,
  UpdateJudicialSector,
} from './actionTypes';
import { loadJudicialSectors, setJudicialSectors } from './actions';
import JudicialSectors from './services';

function* fetchJudicialSectors() {
  try {
    const response: AxiosResponse<WrapDataGetJudicialSectorsResponse> =
      yield call(JudicialSectors.getJudicialSectors);

    yield put(setJudicialSectors(response.data.data));
  } catch (error) {
    yield put(setJudicialSectors([]));
    yield put(
      setActionStatus({
        message: getMessageFromError(error),
        status: 'error',
      }),
    );
  }
}

function* addJudicialSector({ payload }: AddJudicialSector) {
  try {
    yield call(JudicialSectors.addJudicialSectors, payload);
    yield put(loadJudicialSectors(false));
  } catch (error) {
    yield put(
      setActionStatus({ message: getMessageFromError(error), status: 'error' }),
    );
  }
}

function* updateJudicialSector({ payload }: UpdateJudicialSector) {
  try {
    yield call(JudicialSectors.updateJudicialSectors, payload);
    yield put(loadJudicialSectors(false));
  } catch (error) {
    yield put(
      setActionStatus({ message: getMessageFromError(error), status: 'error' }),
    );
  }
}

function* deleteJudicialSector({ payload }: DeleteJudicialSector) {
  try {
    yield call(JudicialSectors.deleteJudicialSector, payload);
  } catch (error) {
    yield put(
      setActionStatus({ message: getMessageFromError(error), status: 'error' }),
    );
  } finally {
    yield put(loadJudicialSectors(false));
  }
}

function* JudicialSectorsSaga() {
  yield takeEvery(ActionType.ADD_COURT_SECTOR, addJudicialSector);
  yield takeEvery(ActionType.LOAD_COURT_SECTORS, fetchJudicialSectors);
  yield takeEvery(ActionType.UPDATE_COURT_SECTOR, updateJudicialSector);
  yield takeEvery(ActionType.DELETE_COURT_SECTOR, deleteJudicialSector);
}

export default JudicialSectorsSaga;
