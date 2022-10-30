import { connect } from 'react-redux';
import { updateModeHearing, setInfoJudicialHearing } from 'store/actions';
import { Button } from 'reactstrap';
import { IControllerHearingProps, Modes } from './ControllerHearingTypes';

const ControllerHearing = ({
  updateModeHearing,
  setInfoJudicialHearing,
}: IControllerHearingProps) => {
  const onModeChange = (mode: Modes) => {
    return () => {
      setInfoJudicialHearing();
      updateModeHearing(mode);
    };
  };
  return (
    <div className='pb-2 pe-4 flex-grow-1 d-flex justify-content-end'>
      <Button
        color='primary'
        className='btn btn-primary mx-2 py-1.5'
        onClick={onModeChange('recorning')}
      >
        Начать заседание
      </Button>
      <Button
        color='primary'
        outline
        className='mx-2  py-1.5'
        onClick={onModeChange('planned')}
      >
        Запланировать заседание
      </Button>
    </div>
  );
};

export default connect(() => ({}), {
  updateModeHearing,
  setInfoJudicialHearing,
})(ControllerHearing);
