import axiosApi from 'utils/api_helper';
import { SERVER_URL, ENDPOINTS } from 'constants/api_endpoints';
import { IDataSetStatusAudioRecordingRequest } from './types';

export default class AudioRecording {
  static async setStatusAudioRecording(
    data: IDataSetStatusAudioRecordingRequest,
  ) {
    return axiosApi.post(
      `${SERVER_URL}/${ENDPOINTS.AUDIO_RECORDING}/${data.status}`,
      data,
    );
  }

  static async getStatusAudio(id: string) {
    return axiosApi.get(
      `${SERVER_URL}/${ENDPOINTS.AUDIO_RECORDING}/show/${id}`,
    );
  }

  static async checkIsDeviceBusy() {
    return axiosApi.get(`${SERVER_URL}/${ENDPOINTS.JUDICIAL_HEARINGS}/record`);
  }
}
