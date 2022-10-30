import axiosApi from 'utils/api_helper';
import {SERVER_URL, ENDPOINTS, SERVER_HOST, SERVER_PORT} from 'constants/api_endpoints';
import {
  IDataAddJudicialHearingRequest,
  IDataLoadFileRequest,
  IDataUpdateParticipantsRequest,
  IDataGetJudicialCaseRequest,
  IDataUpdateJudicialCaseRequest,
  IDataInfoJudicialHearingRequest,
  IDataLoadDocxFileRequest,
} from './types';

export default class JudicialHearings {
  static async getListHearings(caseId: string) {
    return axiosApi.get(
      `${SERVER_URL}/${ENDPOINTS.JUDICIAL_HEARINGS}/show/${caseId}`,
    );
  }

  static async addAudioFile(data: IDataLoadFileRequest) {
    let formData = new FormData();
    formData.append('file', data.file);
    formData.append('meeting_id', data.hearingId);
    return axiosApi.post(`${SERVER_URL}/${ENDPOINTS.FILE}/upload`, formData);
  }

  static async addDocxFile(data: IDataLoadDocxFileRequest) {
    let formData = new FormData();
    formData.append('file', data.file);
    formData.append('meeting_id', data.hearingId);
    formData.append('file_name', data.fileName);
    formData.append('type', data.type);
    return axiosApi.post(`${SERVER_URL}/${ENDPOINTS.FILE}/upload`, formData);
  }

  static async addJudicialHearing(data: IDataAddJudicialHearingRequest) {
    return axiosApi.post(
      `${SERVER_URL}/${ENDPOINTS.JUDICIAL_HEARINGS}/add`,
      data,
    );
  }

  static async updateJudicialHearingStatus(data) {
    return axiosApi.put(
      `${SERVER_URL}/${ENDPOINTS.JUDICIAL_HEARINGS}/status/${data.id}`,
      {status: data.mode}
    );
  }

  static async deleteJudicialHearing(data: string) {
    return axiosApi.delete(
      `${SERVER_URL}/${ENDPOINTS.JUDICIAL_HEARINGS}/delete/${data}`,
    );
  }

  static async getInfoJudicialHearing(data: IDataInfoJudicialHearingRequest) {
    return axiosApi.get(
      `${SERVER_URL}/${ENDPOINTS.JUDICIAL_HEARINGS}/show/${data.caseId}/${data.hearingId}`,
    );
  }

  static async updateParticipants(data: IDataUpdateParticipantsRequest) {
    return axiosApi.put(`${SERVER_URL}/${ENDPOINTS.PARTICIPANTS}/update`, data);
  }

  static async getJudicialCaseInfo(data: IDataGetJudicialCaseRequest) {
    return axiosApi.get(
      `${SERVER_URL}/${ENDPOINTS.JUDICIAL_CASES}/show/${data.areaId}/${data.caseId}`,
    );
  }

  static async updateInfoJudicialCase(data: IDataUpdateJudicialCaseRequest) {
    return axiosApi.put(
      `${SERVER_URL}/${ENDPOINTS.JUDICIAL_CASES}/update`,
      data,
    );
  }

  static async getHtmlFile(path: string) {
    return axiosApi.get(
      `${SERVER_HOST}:${SERVER_PORT}/${path}`,
      {headers: {
          "Cache-Control": "no-cache"
        }}
    )
  }

  static async updateDocumentText({text, id} : {text: Blob, id: number}) {
    let formData = new FormData();
    formData.append('document', text);
    return axiosApi.post(
      `${SERVER_URL}/${ENDPOINTS.DOCUMENTS}/update/${id}`, formData
    )
  }

  static async deleteDocument(id : number) {
    return axiosApi.delete(
      `${SERVER_URL}/${ENDPOINTS.DOCUMENTS}/delete/${id}`
    )
  }
}
