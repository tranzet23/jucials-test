import { put, call, takeEvery } from 'redux-saga/effects';
import { getMessageFromError } from 'utils/app_helper';
import { AUTH_PROTECTED_ROUTES } from 'navigation/index';
import { setActionStatus } from '../actions';
import { ActionType, AddUser } from './actionTypes';
import UserCreation from './services';
import { userCreation, setListRoles } from './actions';

function* fetchUserCreation({ payload: { data, history } }: AddUser) {
  try {
    const response = yield call(UserCreation.fetchCreateUser, data);
    yield put(
      userCreation(response.data.data, {
        code: response.data.code,
        message: response.data.data.message,
      }),
    );

    if (response.data.code === 200) {
      history.push(`${AUTH_PROTECTED_ROUTES.USERS_LIST.pathTransition}`);
    }
  } catch (error: any) {
    yield put(
      userCreation(
        {},
        { code: error.code, message: getMessageFromError(error) },
      ),
    );
  }
}

function* fetchListRoles() {
  try {
    const response = yield call(UserCreation.fetchListRoles);
    yield put(setListRoles(response.data.data));
  } catch (error: any) {
    yield put(setListRoles());
    yield put(
      setActionStatus({
        message: getMessageFromError(error),
        status: 'error',
      }),
    );
  }
}

function* fetchEditUser({ payload: { data, history } }: AddUser) {
  try {
    const response = yield call(UserCreation.fetchEditUser, data);

    yield put(
      userCreation(response.data.data, {
        code: response.data.code,
        message: response.data.data.message,
      }),
    );

    if (response.data.code === 200) {
      history.push(`${AUTH_PROTECTED_ROUTES.USERS_LIST.pathTransition}`);
    }
  } catch (error: any) {
    yield put(
      userCreation(
        {},
        { code: error.code, message: getMessageFromError(error) },
      ),
    );
  }
}

function* fetchLoadUser(data) {
  try {
    const response = yield call(UserCreation.fetchLoadUser, data.payload);
    yield put(userCreation(response.data.data));
  } catch (error) {
    yield put(userCreation(error));
    yield put(
      setActionStatus({
        message: getMessageFromError(error),
        status: 'error',
      }),
    );
  }
}

export function* watchUserCreation() {
  yield takeEvery(ActionType.ADD_USER, fetchUserCreation);
  yield takeEvery(ActionType.EDIT_USER, fetchEditUser);
  yield takeEvery(ActionType.LOAD_USER, fetchLoadUser);
  yield takeEvery(ActionType.LOAD_LIST_ROLES, fetchListRoles);
}

export default watchUserCreation;
