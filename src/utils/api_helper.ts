import axios from 'axios';
import { WrapDataUserLoginResponse } from 'store/auth/login/types';
import { PUBLIC_ROUTES } from 'navigation/index';
import { SERVER_URL, ENDPOINTS } from 'constants/api_endpoints';
import { nameApp, nameToken } from 'constants/app_сonstants';
import {
  MESSAGE_BY_HEADER,
  CODE_ACCESS_IS_DENIED,
} from 'constants/api_сonstants';

export const timeout = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const getMessageFromHeader = (code = 502) =>
  MESSAGE_BY_HEADER[code] || MESSAGE_BY_HEADER[502];

const axiosApi = axios.create({
  withCredentials: true,
  baseURL: SERVER_URL,
});

axiosApi.interceptors.request.use(config => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(nameToken)}`;
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
});

const refreshToken = async () =>
  await axios.get<WrapDataUserLoginResponse>(
    `${SERVER_URL}/${ENDPOINTS.AUTH}/refreshtoken`,
    {
      withCredentials: true,
    },
  );

let isNeedRefreshToken = true;
let failedQueue: any[] = [];

const processQueue = (error: unknown, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosApi.interceptors.response.use(
  config => {
    return config;
  },

  async error => {
    const originalRequest = error.config;

    if (
      error.response.status === CODE_ACCESS_IS_DENIED &&
      error.config &&
      !error.config._retry
    ) {
      if (isNeedRefreshToken === false) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return axiosApi(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isNeedRefreshToken = false;
      return new Promise(function (resolve, reject) {
        refreshToken()
          .then(response => {
            localStorage.setItem(nameToken, response.data.data.accessToken);
            processQueue(null);
            resolve(axiosApi(error.config));
          })
          .catch(err => {
            localStorage.removeItem(nameToken);
            localStorage.removeItem(nameApp);

            if (
              window.location.pathname !== PUBLIC_ROUTES.LOGIN.pathTransition
            ) {
              window.location.href = PUBLIC_ROUTES.LOGIN.pathTransition;
            }

            console.log('НЕ АВТОРИЗОВАН');
            processQueue(err);
            reject(err);
          })
          .finally(() => {
            isNeedRefreshToken = true;
          });
      });
    }

    throw error;
  },
);

export default axiosApi;
