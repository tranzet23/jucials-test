import { connect } from 'react-redux';
import { RootState } from 'store/reducers';
import { getDataAboutBusyDevice } from 'store/selectors';
import { WavesurferLoader } from 'components';
import { IBusyDevicePanelTypes } from './BusyDevicePanelTypes';

function BusyDevicePanel({ data }: IBusyDevicePanelTypes) {
  const messageText = `Устройсто записывает совещаение № ${data.meetingId}, дело № ${data.caseId}`;
  return <WavesurferLoader message={messageText} />;
}

const mapStatetoProps = (state: RootState) => {
  const data = getDataAboutBusyDevice(state);

  return { data };
};

export default connect(mapStatetoProps, {})(BusyDevicePanel);
