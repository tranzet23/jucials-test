export const nameApp = 'armSecretary';
export const nameToken = 'token';

export const VALUE_FIELDS_FOR_FORM = {
  uid: 'УИД',
  case_id: 'Номер',
  plaintiff: 'Истец',
  defendant: 'Ответчик',
  date: 'Дата',
  time: 'Время',
  role: 'Роль',
  name: 'Имя',
  surname: 'Отчество',
  familyName: 'Фамилия',
  reg_address: 'Адрес регистрации',
  res_address: 'Адрес проживания',
  phone: 'Номер телефона',
  lastname: 'Фамилия',
  birthday: 'Дата рождения',
  bank: 'Банк',
  company: 'Название компании',
  inn: 'ИНН',
  ogrn: 'ОРГН',
  legal_address: 'Юридический адрес',
  mailing_address: 'Почтовый адрес',
  kpp: 'КПП',
  pc: 'Р/c',
  bic: 'БИК',
  kc: 'К/c',
  '№': '№',
  start: 'Дата'
};

//#region "left sidebar"
export const TITLES_LEFT_MENU = {
  admin: 'меню администратора',
  user: 'меню секретаря суда',
};
//#endregion "left sidebar"

//#endregion "header"

export const TYPES_DOCUMENTS = {
  solution: {
    name: 'Решение',
    icon: 'mdi mdi-file-document-outline',
  },
  resolution: {
    name: 'Постановление',
    icon: 'mdi mdi-file-document-outline',
  },
  0: {
    name: 'Протокол',
    icon: 'mdi mdi-file-document-outline',
  },

  court_order: {
    name: 'Судебный приказ',
    icon: 'mdi mdi-file-document-outline',
  },
};

export const DEFAULT_COLORS = [
  '#FFFFFF',
  '#A7D2F8',
  '#AAB6F2',
  '#FFE280',

  '#FF9696',
  '#FFD1F0',
  '#C9D96D',
  '#D3EDFF',

  '#FFF0F0',
  '#F0C6FF',
  '#C8CFF0',
  '#E9FFFF',

  '#EBEBEB',
  '#FCC5BB',
  '#FFA8A8',
  '#C0AFFF',

  '#BBD9EB',
  '#FFC79F',
  '#B4BADB',
  '#D17DBD',
];

export const REQUIRED_STATUS_FIELDS = {
  Profile: ['roleId', 'areaId'],
  JudicialCases: ['selectedCaseId', 'selectedCaseNumber'],
  JudicialHearing: ['selectedHearingId'],
};

export const DEFAULT_PARTICIPANT = {
  channel: '0',
  color: DEFAULT_COLORS[0],
  id: 0,
  name: '',
  type: '',
  lastname: '',
  surname: '',
  timeEnd: 0,
  timeStart: 0,
};

export const HTML_ENCODING =
  '<!DOCTYPE html> <head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head>';
