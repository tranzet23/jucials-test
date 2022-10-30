import axiosApi from 'utils/api_helper';
import { SERVER_URL, ENDPOINTS } from 'constants/api_endpoints';
export default class DocTemplates {
  static async fetchDocTemplates(
    id: number | string = '',
    type: string | null = null,
  ) {
    if (type === 'template') {
      return axiosApi.get(
        `${SERVER_URL}/${ENDPOINTS.DOC_TEMPLATES}/show/${id}`,
      );
    }
    return axiosApi.get(`${SERVER_URL}/${ENDPOINTS.DOC_TEMPLATES}/user/${id}`);
  }
  static async addDocTemplate(item) {
    let formData = new FormData();
    formData.append('user_id', item.userId);
    formData.append('content', item.content);
    formData.append('title', item.title);
    for (let i = 0; i < item?.blocks?.length; i++) {
      const element = item.blocks[i];
      formData.append(`block_${i + 1}_title`, element.title);
      formData.append(`block_${i + 1}_content`, element.content);
    }

    if (item.templateId) {
      formData.append('template_id', item.templateId);
    }
    return axiosApi.post(
      `${SERVER_URL}/${ENDPOINTS.DOC_TEMPLATES}/add`,
      formData,
    );
  }
  static async updateDocTemplate(item) {
    let formData = new FormData();
    formData.append('content', item.content);
    formData.append('title', item.title);
    formData.append('template_id', item.id);
    return axiosApi.post(
      `${SERVER_URL}/${ENDPOINTS.DOC_TEMPLATES}/update`,
      formData,
    );
  }
  static async deleteDocTemplate(itemId) {
    return axiosApi.delete(
      `${SERVER_URL}/${ENDPOINTS.DOC_TEMPLATES}/delete/${itemId}`,
    );
  }
}
