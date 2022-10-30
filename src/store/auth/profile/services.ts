import axiosApi from 'utils/api_helper';
import { SERVER_URL, ENDPOINTS } from 'constants/api_endpoints';

export default class Profile {
  static async fetchDataProfile() {
    return axiosApi.get(`${SERVER_URL}/${ENDPOINTS.USERS}/info`);
  }
}
