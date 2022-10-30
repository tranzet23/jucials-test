import { RecordingStatuses } from '../../AudioRecordingTypes';

export interface IControlerPlayerRecordingProps {
  statusRecord: RecordingStatuses;
  setStatusRecord: (status: RecordingStatuses) => void;
}
