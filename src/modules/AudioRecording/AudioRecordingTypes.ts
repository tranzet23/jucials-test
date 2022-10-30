import { RouteComponentProps } from 'react-router-dom';
import { RecordingStatuses as RecordingStatusesStore } from 'store/audioRecording/types';

export type RecordingStatuses = RecordingStatusesStore;
type History = RouteComponentProps['history'];

export interface IAudioRecordingPageProps extends RouteComponentProps {
  status: RecordingStatuses;
  history: History;
  checkDataAboutBusyDevice: () => void;
  changeStatusAudioRecording: (
    status: RecordingStatuses,
    history: History,
  ) => void;
}
