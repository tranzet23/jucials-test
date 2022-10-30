import axiosApi from 'utils/api_helper';
import { AxiosResponse } from 'axios';
import { IResponse, IUsersList } from 'models/response';
import { SERVER_URL, ENDPOINTS } from 'constants/api_endpoints';

export default class UsersList {
  static async fetchUsersList(): Promise<AxiosResponse<IResponse<IUsersList>>> {
    return axiosApi.get<IResponse<IUsersList>>(
      `${SERVER_URL}/${ENDPOINTS.USERS}/show`,
    );
  }
  static async fetchDeleteUser(
    data: number,
  ): Promise<AxiosResponse<IResponse<IUsersList>>> {
    return axiosApi.delete<IResponse<IUsersList>>(
      `${SERVER_URL}/${ENDPOINTS.USERS}/delete/${data}`,
    );
  }
}
