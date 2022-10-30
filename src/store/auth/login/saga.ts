import { put, call, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { getMessageFromError } from 'utils/app_helper';
import { getMessageFromHeader, timeout } from 'utils/api_helper';
import { PUBLIC_ROUTES, AUTH_PROTECTED_ROUTES } from 'navigation/index';
import { nameApp, nameToken } from 'constants/app_сonstants';
import { RESPONSE_STATUSES } from 'models/response';
import { setActionStatus } from '../../actions';
import { getProfileData } from '../profile/actions';
import { WrapDataUserLoginResponse } from './types';
import { ActionType, ILoginUser, ILogoutUser } from './actionTypes';
import { loginSuccess, loginFail, logoutUserSuccess } from './actions';

import Auth from './services';

function* loginUser({ payload: { userData, history } }: ILoginUser) {
  try {
    const response: AxiosResponse<WrapDataUserLoginResponse> = yield call(
      Auth.fetchLoginUser,
      userData,
    );
    if (response.data.status === RESPONSE_STATUSES.ERROR) {
      yield put(loginFail(response.data.message));
    }

    localStorage.setItem(nameToken, response.data.data.accessToken);

    yield timeout(1000);
    yield put(loginSuccess()); //transfer user, when user exist as parameter in response
    yield put(getProfileData());
    history.push(AUTH_PROTECTED_ROUTES.DEFAULT.pathTransition);
  } catch (error) {
    const respError = error as any;
    yield put(loginFail(getMessageFromHeader(respError.response?.status)));
    yield put(
      setActionStatus({
        message: getMessageFromError(error),
        status: 'error',
      }),
    );
  }
}

function* logoutUser({ payload: history }: ILogoutUser) {
  try {
    yield call(Auth.fetchLogoutUser);
    yield put(logoutUserSuccess());

    localStorage.removeItem(nameToken);
    localStorage.removeItem(nameApp);

    history.push(PUBLIC_ROUTES.LOGIN.pathTransition);
  } catch (error) {
    yield put(
      setActionStatus({
        message: getMessageFromError(error),
        status: 'error',
      }),
    );
  }
}

function* authSaga() {
  yield takeEvery(ActionType.LOGIN_USER, loginUser);
  yield takeEvery(ActionType.LOGOUT_USER, logoutUser);
}

export default authSaga;
