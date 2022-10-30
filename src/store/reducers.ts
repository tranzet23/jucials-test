import { combineReducers } from 'redux';
// Front
import Layout from './layout/reducer';
import Profile from './auth/profile/reducer';
import Login from './auth/login/reducer';
import JudicialHearing from './judicialHearing/reducer';
import JudicialCases from './judicialCases/reducer';
import Transcription from './transcription/reducer';
import JudicialSectors from './judicialSectors/reducer';
import AudioRecording from './audioRecording/reducer';
import UserCreation from './userCreation/reducer';
import UsersList from './userList/reducer';
import UserRoles from './userRoles/reducer';
import DocTemplates from './docTemplates/reducer';
import ActionStatus from './actionStatus/reducer';

const rootReducer = combineReducers({
  Layout,
  Profile,
  Login,
  JudicialCases,
  JudicialHearing,
  Transcription,
  JudicialSectors,
  AudioRecording,
  UserCreation,
  UsersList,
  UserRoles,
  DocTemplates,
  ActionStatus,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
