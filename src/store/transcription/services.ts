import axiosApi from 'utils/api_helper';
import { SERVER_URL, ENDPOINTS } from 'constants/api_endpoints';

export default class Transcription {
  static async fetchSoundFile(params: any) {
    return axiosApi.get(`${SERVER_URL}/${ENDPOINTS.FILE}/get/${params.id}`, {
      signal: params.signal,
    });
  }

  static async startTranscribation(params: any) {
    return axiosApi.get(
      `${SERVER_URL}/${ENDPOINTS.TRANSCRIBATION}/start/${params.id}`,
    );
  }

  static async checkTranscribation(params: any) {
    return axiosApi.get(
      `${SERVER_URL}/${ENDPOINTS.TRANSCRIBATION}/check/${params.id}`,
    );
  }

  static async getTranscribation(params: any) {
    return axiosApi.get(
      `${SERVER_URL}/${ENDPOINTS.TRANSCRIBATION}/show/${params.id}?isDiarization=${params.isUseDiarization}`,
    );
  }

  static async checkIsStartTranscribation(params: any) {
    try {
      await axiosApi.get(
        `${SERVER_URL}/${ENDPOINTS.TRANSCRIBATION}/check/${params.id}`,
      );

      return true;
    } catch {
      return false;
    }
  }
}
