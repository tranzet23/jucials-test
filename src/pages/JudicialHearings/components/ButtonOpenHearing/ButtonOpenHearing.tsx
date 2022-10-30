import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import {
  setSelectedJudicialHearingId,
  setListHearings,
  setInfoJudicialHearing,
  setChannels,
  setStatusUseDiarization,
} from 'store/actions';
import { AUTH_PROTECTED_ROUTES } from 'navigation/index';
import { IButtonOpenHearingProps } from './ButtonOpenHearingTypes';

const ButtonOpenHearing = ({
  hearingId,
  setChannels,
  setListHearings,
  setSelectedJudicialHearingId,
  setInfoJudicialHearing,
  setStatusUseDiarization,
}: IButtonOpenHearingProps) => {
  const onButtonClick = (hearingId: string) => {
    return () => {
      setChannels();
      setInfoJudicialHearing();
      setListHearings();
      setSelectedJudicialHearingId(hearingId);
      setStatusUseDiarization(false);
    };
  };

  return (
    <Link
      to={`${AUTH_PROTECTED_ROUTES.TRANSCRIPTION.pathTransition}`}
      className='ms-4'
    >
      <Button outline color='primary' onClick={onButtonClick(hearingId)}>
        Открыть заседание
      </Button>
    </Link>
  );
};

export default connect(() => ({}), {
  setSelectedJudicialHearingId,
  setListHearings,
  setInfoJudicialHearing,
  setChannels,
  setStatusUseDiarization,
})(ButtonOpenHearing);
