import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FormGroup, Input, Label, Spinner } from 'reactstrap';
import { RootState } from 'store/reducers';
import { setStatusUseDiarization } from 'store/actions';
import { ITranscribatoinStartButton } from './TranscribationStartButtonTypes';

function TranscribationStartButton({
  handleTranscriptionStart,
  transcribationStatus,
  setIsTranscribationTime,
  setStatusUseDiarization,
}: ITranscribatoinStartButton) {
  const [isTimeShow, setIsTimeShow] = useState(false);
  const [isUseDiarization, setIsUseDiarization] = useState(false);

  const onChangeInput = () => {
    setIsTimeShow(prev => {
      setIsTranscribationTime(!prev);
      return !prev;
    });
  };

  const onChangeStatusDiarization = () => {
    setIsUseDiarization(prev => {
      setStatusUseDiarization(!prev);
      return !prev;
    });
  };

  return (
    <div className='control__transcr-button-container'>
      <button
        className='btn btn-primary'
        disabled={transcribationStatus === 'trascribating'}
        onClick={handleTranscriptionStart}
      >
        <p>Транскрибация</p>
        {transcribationStatus === 'trascribating' && (
          <Spinner
            size='sm'
            style={{ width: '0.75rem', height: '0.75rem', minWidth: '0.75rem' }}
          />
        )}
      </button>
      <FormGroup className='label d-flex align-items-center'>
        <Input
          type='checkbox'
          className='me-2'
          id='transcribation-time'
          checked={isTimeShow}
          onChange={onChangeInput}
        />
        <Label htmlFor='transcribation-time' className='mb-0'>
          Отобразить время
        </Label>
      </FormGroup>
      <FormGroup className='label'>
        <Input
          type='checkbox'
          className='me-2'
          id='transcribation-diarization'
          checked={isUseDiarization}
          onChange={onChangeStatusDiarization}
        />
        <Label htmlFor='diarization-time' className='mb-0'>
          Диаризация
        </Label>
      </FormGroup>
    </div>
  );
}

const mapStatetoProps = (state: RootState) => {
  const { transcribationStatus } = state.Transcription;

  return {
    transcribationStatus,
  };
};
export default connect(mapStatetoProps, { setStatusUseDiarization })(
  TranscribationStartButton,
);
