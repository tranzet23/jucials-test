import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { RootState } from 'store/reducers';
import { getStatusAudio } from 'store/selectors';
import {
  getStatusAudioRecording,
  cancelStatusPolling,
  setDefDataStatusAudio,
} from 'store/actions';
import { AudioRecording, FormUpload } from 'modules';
import { WavesurferLoader } from 'components';
import { WorkOverHearings } from '../../components';
import { ITransitPanelProps, Statuses } from './TransitPanelTypes';

const TransitPanel = (props: ITransitPanelProps) => {
  const {
    status,
    getStatusAudioRecording,
    cancelStatusPolling,
    setDefDataStatusAudio,
  } = props;
  const [typeGetAudio, setTypeGetAudio] = useState<Statuses>(status);

  useEffect(() => {
    setTypeGetAudio(status);
  }, [status]);

  useEffect(() => {
    getStatusAudioRecording();

    return () => {
      cancelStatusPolling();
      setDefDataStatusAudio();
    };
  }, [cancelStatusPolling, setDefDataStatusAudio, getStatusAudioRecording]);


  return (
    <Row>
      <Col xs='12'>
        <Card>
          <CardBody>
            {typeGetAudio === 'needLoad' && (
              <WorkOverHearings setType={setTypeGetAudio} />
            )}
            {(typeGetAudio === 'recording' ||
              typeGetAudio === 'run' ||
              typeGetAudio === 'pause' ||
              typeGetAudio === 'stop') && <AudioRecording />}
            {typeGetAudio === 'loading' && (
              <FormUpload title='Загрузка файла' />
            )}
            {(typeGetAudio === 'ready' || typeGetAudio === 'loaded') &&
              props.children}
            {typeGetAudio === 'await' && (
              <WavesurferLoader message='Аудиофайл загружается ...' />
            )}
            {typeGetAudio === 'processing' && (
              <WavesurferLoader message='Аудиофайл обрабатывается ...' />
            )}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

const mapStatetoProps = (state: RootState) => {
  const soundFileStatus = getStatusAudio(state);

  return {
    status: soundFileStatus,
  };
};
export default connect(mapStatetoProps, {
  getStatusAudioRecording,
  cancelStatusPolling,
  setDefDataStatusAudio,
})(TransitPanel);
