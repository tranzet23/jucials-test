import { call, put, takeEvery } from 'redux-saga/effects';
import { getMessageFromError } from 'utils/app_helper';
import { setActionStatus } from '../actions';
import {
  setUserAccessRoles,
  setUserRole,
  setUserRoles,
  setUserRolesMessage,
  setUserRolesModalCondition,
} from './actions';
import {
  ActionType,
  IAddUserRoles,
  IDeleteUserRoles,
  IGetUserRoleEdit,
  IUpdateUserRoles,
} from './actionTypes';
import UserRoles from './services';

function* fetchUserRoles() {
  try {
    const response = yield call(UserRoles.fetchUserRoles);

    yield put(setUserRoles(response.data.data));
  } catch (error) {
    yield put(
      setActionStatus({
        message: getMessageFromError(error),
        status: 'error',
      }),
    );
  }
}

function* fetchAccessUserRoles() {
  try {
    const response = yield call(UserRoles.fetchUserAccessRoles);

    yield put(setUserAccessRoles(response.data.data));
  } catch (error) {
    yield put(
      setActionStatus({
        message: getMessageFromError(error),
        status: 'error',
      }),
    );
  }
}

function* fetchUserRole({ payload }: IGetUserRoleEdit) {
  try {
    const accessRolesResponse = yield call(UserRoles.fetchUserAccessRoles);

    yield put(setUserAccessRoles(accessRolesResponse.data.data));

    const userRolesResponse = yield call(UserRoles.fetchUserRole, payload);

    yield put(setUserRole(userRolesResponse.data.data[0]));
    yield put(setUserRolesMessage(null));
  } catch (error) {
    yield put(setUserRolesMessage('error'));
    yield put(
      setActionStatus({
        message: getMessageFromError(error),
        status: 'error',
      }),
    );
  }
}

function* addUserRole({ payload }: IAddUserRoles) {
  try {
    yield call(UserRoles.addUserRoles, payload);
    yield put(setUserRolesMessage('add'));
  } catch (error) {
    yield put(setUserRolesMessage('error'));
    yield put(
      setActionStatus({
        message: getMessageFromError(error),
        status: 'error',
      }),
    );
  }
}
function* updateUserRole({ payload }: IUpdateUserRoles) {
  try {
    yield call(UserRoles.updateUserRoles, payload);
    yield put(setUserRolesMessage('edit'));
  } catch (error) {
    yield put(setUserRolesMessage('error'));
    yield put(
      setActionStatus({
        message: getMessageFromError(error),
        status: 'error',
      }),
    );
  }
}
function* deleteUserRole({ payload }: IDeleteUserRoles) {
  try {
    yield call(UserRoles.deleteUserRoles, payload);

    yield put(setUserRolesModalCondition(false, null));
    yield call(fetchUserRoles);
  } catch (error) {
    yield put(
      setActionStatus({
        message: getMessageFromError(error),
        status: 'error',
      }),
    );
  }
}

function* watchUserRoles() {
  yield takeEvery(ActionType.FETCH_USER_ROLES, fetchUserRoles);
  yield takeEvery(ActionType.ADD_USER_ROLES, addUserRole);
  yield takeEvery(ActionType.UPDATE_USER_ROLES, updateUserRole);
  yield takeEvery(ActionType.DELETE_USER_ROLES, deleteUserRole);
  yield takeEvery(ActionType.GET_USER_ROLE_EDIT, fetchUserRole);
  yield takeEvery(ActionType.FETCH_ACCESS_USER_ROLES, fetchAccessUserRoles);
}

export default watchUserRoles;
