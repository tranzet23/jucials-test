import { call, takeEvery } from 'redux-saga/effects';
import { IUpdateTheme, ActionType } from './actionTypes';

function changeBodyAttribute(attribute: string, value: string) {
  if (document.body) document.body.setAttribute(attribute, value);
  return true;
}
function* changeTheme({ payload: theme }: IUpdateTheme) {
  try {
    yield call(changeBodyAttribute, 'data-sidebar', theme);
    // yield call(changeBodyAttribute, 'data-topbar', theme);
  } catch (error) {}
  return theme;
}

function* LayoutSaga() {
  yield takeEvery(ActionType.UPDATE_THEME, changeTheme);
}

export default LayoutSaga;
