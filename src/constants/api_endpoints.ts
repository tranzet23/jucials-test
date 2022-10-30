export const SERVER_HOST = 'http://82.151.110.244'; //'http://82.151.110.239'; // `http://${window.location.hostname}`;
export const SERVER_PORT = '8027';
export const SERVER_WORKSPACE = 'api';
export const SERVER_URL = `${SERVER_HOST}:${SERVER_PORT}/${SERVER_WORKSPACE}`;

export const ENDPOINTS = {
  JUDICIAL_AREAS: 'areas', // работа с участками
  JUDICIAL_CASES: 'cases', // работа с судебными делами
  JUDICIAL_HEARINGS: 'meetings', // работа с заседания
  USERS: 'users', //работа с пользователями
  AUTH: 'auth', //работа с токеном
  FILE: 'file', //работа с файлами
  PARTICIPANTS: 'participants', // работа с участниками
  AUDIO_RECORDING: 'record', // управление записью аудио
  ROLES: 'roles', //работа с ролями пользователей
  ACCESS_ROLES: 'access', //работа с ролями пользователей
  DOC_TEMPLATES: 'templates', // шаблоны документа
  TRANSCRIBATION: 'transcribation', // транскрибация аудиофайла
  DOCUMENTS: 'documents', // сохраненые документы
};
