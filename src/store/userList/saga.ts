import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { getMessageFromError } from 'utils/app_helper';
import { setActionStatus } from '../actions';
import { ActionType } from './actionTypes';
import { deleteUser, loadUsersList, setUsersList } from './actions';
import UsersList from './services';

function* fetchUsersList() {
  try {
    const response = yield call(UsersList.fetchUsersList);
    yield put(setUsersList(response.data.data));
  } catch (error) {
    yield put(setUsersList([]));
    yield put(
      setActionStatus({
        message: getMessageFromError(error),
        status: 'error',
      }),
    );
  }
}
function* fetchDeleteUser(data) {
  try {
    const response = yield call(UsersList.fetchDeleteUser, data.payload);

    yield call(deleteUser, response.payload);
    yield put(loadUsersList(false));
  } catch (error) {
    yield put(loadUsersList(false));
    yield put(
      setActionStatus({
        message: getMessageFromError(error),
        status: 'error',
      }),
    );
  }
}

export function* watchUsersList() {
  yield takeEvery(ActionType.LOAD_USERS_LIST, fetchUsersList);
  yield takeEvery(ActionType.DELETE_USER, fetchDeleteUser);
}

function* LayoutUsersList() {
  yield all([fork(watchUsersList)]);
}

export default LayoutUsersList;
