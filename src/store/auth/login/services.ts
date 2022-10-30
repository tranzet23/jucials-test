import axiosApi from 'utils/api_helper';
import { SERVER_URL, ENDPOINTS } from 'constants/api_endpoints';

export default class Auth {
  static async fetchLoginUser(data: { user: string; pass: string }) {
    return axiosApi.post(`${SERVER_URL}/${ENDPOINTS.AUTH}/authorization`, {
      user: data.user,
      pass: data.pass,
    });
  }

  static async fetchLogoutUser() {
    return axiosApi.get(`${SERVER_URL}/${ENDPOINTS.AUTH}/logout`);
  }
}
