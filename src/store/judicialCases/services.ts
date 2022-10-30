import axiosApi from 'utils/api_helper';
import { SERVER_URL, ENDPOINTS } from 'constants/api_endpoints';
import {IJudicialCasesItem, IJudicialCasesItemAdd} from './types';

export default class JudicialCases {
  static async getJudicialCases(areaId: number) {
    return axiosApi.get(
      `${SERVER_URL}/${ENDPOINTS.JUDICIAL_CASES}/show/${areaId}`,
    );
  }

  static async addJudicialCases(item: IJudicialCasesItemAdd) {
    return axiosApi.post(`${SERVER_URL}/${ENDPOINTS.JUDICIAL_CASES}/add`, item);
  }
  static async updateJudicialCases(item: IJudicialCasesItem) {
    return axiosApi.put(
      `${SERVER_URL}/${ENDPOINTS.JUDICIAL_CASES}/update`,
      item,
    );
  }
  static async deleteJudicialCases(id) {
    return axiosApi.delete(
      `${SERVER_URL}/${ENDPOINTS.JUDICIAL_CASES}/delete/${id}`,
    );
  }
}
