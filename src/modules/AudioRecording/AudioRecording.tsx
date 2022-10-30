import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  changeStatusAudioRecording,
  checkDataAboutBusyDevice,
} from 'store/actions';
import { getStatusForRecord } from 'store/selectors';
import { RootState } from 'store/reducers';
import {
  ControlerPlayerRecording,
  PlayerRecording,
  BusyDevicePanel,
} from './components';
import {
  RecordingStatuses,
  IAudioRecordingPageProps,
} from './AudioRecordingTypes';

const AudioRecording = ({
  status,
  history,
  changeStatusAudioRecording,
  checkDataAboutBusyDevice,
}: IAudioRecordingPageProps) => {
  const [statusRecord, setStatusRecord] = useState<RecordingStatuses>(status);

  useEffect(() => {
    checkDataAboutBusyDevice();
  }, [checkDataAboutBusyDevice]);

  const onStatusRecordChange = (status: RecordingStatuses) => {
    if (status !== 'none') {
      setStatusRecord(status);
      changeStatusAudioRecording(status, history);
    }
  };

  return (
    <>
      {status === 'busy' ? (
        <BusyDevicePanel />
      ) : (
        <>
          <PlayerRecording
            statusRecord={statusRecord}
            setStatusRecord={onStatusRecordChange}
          />

          <ControlerPlayerRecording
            statusRecord={statusRecord}
            setStatusRecord={onStatusRecordChange}
          />
        </>
      )}
    </>
  );
};

const mapStatetoProps = (state: RootState) => {
  const status = getStatusForRecord(state);

  return { status };
};

export default connect(mapStatetoProps, {
  changeStatusAudioRecording,
  checkDataAboutBusyDevice,
})(withRouter(AudioRecording));
