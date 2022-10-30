import axiosApi from 'utils/api_helper';

import { IJudicialSectorsItem } from './types';
import { SERVER_URL, ENDPOINTS } from 'constants/api_endpoints';

export default class JudicialSectors {
  static async getJudicialSectors() {
    return axiosApi.get(`${SERVER_URL}/${ENDPOINTS.JUDICIAL_AREAS}/show`);
  }

  static async addJudicialSectors(data: IJudicialSectorsItem) {
    return axiosApi.post(`${SERVER_URL}/${ENDPOINTS.JUDICIAL_AREAS}/add`, data);
  }

  static async updateJudicialSectors(data: IJudicialSectorsItem) {
    return axiosApi.put(
      `${SERVER_URL}/${ENDPOINTS.JUDICIAL_AREAS}/update`,
      data,
    );
  }

  static async deleteJudicialSector(data: number) {
    return axiosApi.delete(
      `${SERVER_URL}/${ENDPOINTS.JUDICIAL_AREAS}/delete/${data}`,
    );
  }
}
