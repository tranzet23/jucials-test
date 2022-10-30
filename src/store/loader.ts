import { nameApp, REQUIRED_STATUS_FIELDS } from 'constants/app_сonstants';

export default class StateLoader {
  loadState() {
    try {
      let serializedState = localStorage.getItem(nameApp);

      if (serializedState === null) {
        return this.initializeState();
      }

      return JSON.parse(serializedState);
    } catch (err) {
      return this.initializeState();
    }
  }

  saveState(state) {
    try {
      let needObj = {};
      Object.keys(REQUIRED_STATUS_FIELDS).forEach(key => {
        needObj[key] = {};
        REQUIRED_STATUS_FIELDS[key].forEach(
          (field: string) => (needObj[key][field] = state[key][field]),
        );
      });

      const serializedState = JSON.stringify(needObj);
      localStorage.setItem(nameApp, serializedState);
    } catch (err) {
      console.log(err);
    }
  }

  initializeState() {
    return {};
  }
}
