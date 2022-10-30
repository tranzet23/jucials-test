import { put, call, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { RESPONSE_STATUSES } from 'models/response';
import { ActionType } from './actionTypes';
import { WrapDataProfileResponse, IProfile } from './types';
import { getProfileDataSuccess, getProfileDataFail } from './actions';
import Profile from './services';

function* loadingProfileData() {
  try {
    const response: AxiosResponse<WrapDataProfileResponse> = yield call(
      Profile.fetchDataProfile,
    );
    if (response.data.status === RESPONSE_STATUSES.ERROR) {
      yield put(getProfileDataFail());
    }
    const dataProfile: IProfile = {
      username: response.data.data.user.name,
      position: response.data.data.user.position,
      pages: response.data.data.pages,
      roleId: response.data.data.user.role_id,
      userId: response.data.data.user.user_id,
      areaId: response.data.data.areas.district_id,
      areaAddress: response.data.data.areas.address,
    };

    yield put(getProfileDataSuccess(dataProfile));
  } catch (error) {
    yield put(getProfileDataFail());
  }
}

function* profileSaga() {
  yield takeEvery(ActionType.GET_PROFILE_DATA, loadingProfileData);
}

export default profileSaga;
