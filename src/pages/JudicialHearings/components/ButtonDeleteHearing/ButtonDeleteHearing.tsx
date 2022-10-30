import { connect } from 'react-redux';
import {
  setSelectedJudicialHearingId,
  updateModeHearing,
  setSelectedHearingNumber,
} from 'store/actions';
import deleteImg from 'assets/images/courtCases/delete.svg';

const ButtonDeleteHearing = ({
  hearingId,
  hearingName,
  setSelectedJudicialHearingId,
  setSelectedHearingNumber,
  updateModeHearing,
}) => {
  const onButtonClick = () => {
    return () => {
      setSelectedJudicialHearingId(hearingId);
      setSelectedHearingNumber(hearingName);
      updateModeHearing('delete');
    };
  };

  return (
    <div
      onClick={onButtonClick()}
      className='p-2'
      style={{ cursor: 'pointer' }}
    >
      <img src={deleteImg} alt='Редактировать' />
    </div>
  );
};

export default connect(props => ({ ...props }), {
  setSelectedJudicialHearingId,
  updateModeHearing,
  setSelectedHearingNumber,
})(ButtonDeleteHearing);
