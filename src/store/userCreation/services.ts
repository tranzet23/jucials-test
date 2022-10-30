import axiosApi from 'utils/api_helper';
import { AxiosResponse } from 'axios';
import { IEditUser, IResponse, IUserCreation } from 'models/response';
import { SERVER_URL, ENDPOINTS } from 'constants/api_endpoints';

export default class UserCreation {
  static async fetchCreateUser(
    data,
  ): Promise<AxiosResponse<IResponse<IUserCreation>>> {
    return axiosApi.post<IResponse<IUserCreation>>(
      `${SERVER_URL}/${ENDPOINTS.USERS}/add`,
      data,
    );
  }
  static async fetchEditUser(
    data,
  ): Promise<AxiosResponse<IResponse<IEditUser>>> {
    return axiosApi.put<IResponse<IEditUser>>(
      `${SERVER_URL}/${ENDPOINTS.USERS}/update`,
      data,
    );
  }
  static async fetchLoadUser(
    data,
  ): Promise<AxiosResponse<IResponse<IEditUser>>> {
    return axiosApi.get<IResponse<IEditUser>>(
      `${SERVER_URL}/${ENDPOINTS.USERS}/show/${data}`,
    );
  }
  static async fetchListRoles() {
    return axiosApi.get(`${SERVER_URL}/${ENDPOINTS.ROLES}/show`);
  }
}
