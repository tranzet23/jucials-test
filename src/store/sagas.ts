import { all, call, spawn } from 'redux-saga/effects';
import LayoutSaga from './layout/saga';
import LoginSaga from './auth/login/saga';
import ProfileSaga from './auth/profile/saga';
import JudicialHearing from './judicialHearing/saga';
import TranscriptionSaga from './transcription/saga';
import JudicialCases from './judicialCases/saga';
import JudicialSectorsSaga from './judicialSectors/saga';
import AudioRecording from './audioRecording/saga';
import UserCreationSaga from './userCreation/saga';
import LayoutUsersList from './userList/saga';
import FetchUserRoles from './userRoles/saga';
import DocTemplatesSaga from './docTemplates/saga';

export default function* rootSaga() {
  const sagas = [
    LoginSaga,
    LayoutSaga,
    ProfileSaga,
    JudicialHearing,
    TranscriptionSaga,
    JudicialCases,
    JudicialSectorsSaga,
    AudioRecording,
    UserCreationSaga,
    LayoutUsersList,
    FetchUserRoles,
    DocTemplatesSaga,
  ];

  const retrySagas = yield sagas.map(saga => {
    return spawn(function* () {
      while (true) {
        try {
          yield call(saga);
          break;
        } catch (e) {
          console.log(e);
        }
      }
    });
  });

  yield all(retrySagas);
}
