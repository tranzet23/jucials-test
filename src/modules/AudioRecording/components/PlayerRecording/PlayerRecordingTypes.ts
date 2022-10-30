import { RecordingStatuses } from '../../AudioRecordingTypes';

export interface IPlayerRecordingProps {
  statusRecord: RecordingStatuses;
  setStatusRecord: (status: RecordingStatuses) => void;
}
