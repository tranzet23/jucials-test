export type Modes = 'none' | 'planned' | 'recorning';

export interface IControllerHearingProps {
  updateModeHearing: (mode: Modes) => {};
  setInfoJudicialHearing: () => void;
}
