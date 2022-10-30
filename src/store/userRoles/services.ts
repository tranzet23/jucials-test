import { ENDPOINTS, SERVER_URL } from 'constants/api_endpoints';
import axiosApi from 'utils/api_helper';

export default class UserRoles {
  static async fetchUserRoles() {
    return axiosApi.get(`${SERVER_URL}/${ENDPOINTS.ROLES}/show/`);
  }
  static async fetchUserAccessRoles() {
    return axiosApi.get(`${SERVER_URL}/${ENDPOINTS.ACCESS_ROLES}/show/`);
  }
  static async fetchUserRole(id) {
    return axiosApi.get(`${SERVER_URL}/${ENDPOINTS.ROLES}/show/${id}`);
  }
  static async addUserRoles(data) {
    return axiosApi.post(`${SERVER_URL}/${ENDPOINTS.ROLES}/add`, data);
  }
  static async updateUserRoles(data) {
    return axiosApi.put(`${SERVER_URL}/${ENDPOINTS.ROLES}/update`, data);
  }
  static async deleteUserRoles(id: number) {
    return axiosApi.delete(`${SERVER_URL}/${ENDPOINTS.ROLES}/delete/${id}`);
  }
}
