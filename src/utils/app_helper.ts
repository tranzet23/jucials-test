import { IResponse } from 'models/response';
import axios, { AxiosError } from 'axios';
import { authProtectedRoutes } from 'navigation/index';
import iconAdministrator from 'assets/images/users/administrator.png';
import iconUser from 'assets/images/users/user.png';
import { TITLES_LEFT_MENU, TYPES_DOCUMENTS } from 'constants/app_сonstants';
import { IDocumentation } from 'store/judicialHearing/types';

export const getItemsMenu = (pages: string[]) => {
  if (!pages) {
    return [];
  }

  const pares = authProtectedRoutes.filter(rout => pages.includes(rout.id));
  const items = pares
    .map(item => item.userType)
    .filter((v, i, a) => a.indexOf(v) === i && v !== '');

  return items;
};

export const getTitleSidebarManu = (titleId: string) => {
  switch (titleId) {
    case 'admin':
      return TITLES_LEFT_MENU['admin'];
    case 'user':
      return TITLES_LEFT_MENU['user'];
    default:
      return TITLES_LEFT_MENU['user'];
  }
};

export const getIconUser = (roleId: number) => {
  switch (roleId) {
    case 1:
      return iconAdministrator;
    case 2:
      return iconAdministrator;
    case 3:
      return iconUser;
    default:
      return iconUser;
  }
};

export const getListDataDocByType = (listTypes: IDocumentation[]) => {
  const listDataDoc = listTypes
    .map(type => TYPES_DOCUMENTS[type.type])
    .filter(el => el !== undefined);

  return listDataDoc;
};

export const ucFirst = (str: string) => {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
};

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function getTheFirstLetter(string: string) {
  return string !== null && string !== undefined && string.length
    ? string[0]
    : '';
}

export const insert = (
  arr: number[],
  index: number,
  newItem: number,
  lastIndex: number,
) => [...arr.slice(0, index), newItem, ...arr.slice(index, lastIndex)];

export function getDateInFormat(date?: string) {
  if (!date) return false;

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timezone: 'UTC',
  };
  const dateInFormat = new Date(date);
  /* @ts-ignore */
  return dateInFormat.toLocaleString('ru', options);
}

export function parseParticipantsForSubmit(
  formikParticipants,
  participantsData,
) {
  participantsData.forEach(participant => {
    let changedParticipant = formikParticipants.find(
      missingParticipant =>
        missingParticipant?.id.toString() === participant?.id.toString(),
    );

    participant.channel = changedParticipant ? changedParticipant.channel : '0';

    return participant;
  });

  return participantsData;
}

export function parseTime(time) {
  if (time.slice(0, 3) === '00:') {
    return time.slice(3);
  } else {
    return time;
  }
}

export async function fromBlobToHtmlString(url, stateHandler) {
  let reader = new FileReader();
  let blobFetched = await fetch(url).then(r => r.blob());
  reader.readAsText(blobFetched);
  reader.onload = function () {
    return stateHandler(reader.result);
  };
}

export const getMessageFromError = (error: unknown) => {
  let message = '';

  if (axios.isAxiosError(error)) {
    const serverError = error as AxiosError<IResponse<{}>>;

    message = serverError.response
      ? serverError.response.data.message
      : serverError.message;
  }

  return message;
};

export const getFormatedTime = time => {
  return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
};

export const getTimeAsSecond = (time?: string) => {
  if (!time) {
    return 0;
  }
  var timeAsArr = time.split(':');
  if (timeAsArr.length !== 3) {
    return 0;
  }
  const seconds = +timeAsArr[0] * 60 * 60 + +timeAsArr[1] * 60 + +timeAsArr[2];
  return seconds;
};

export const getSecondsAsTime = (timestamp?: number) => {
  if (!timestamp) {
    return '00:00:00';
  }
  const hours = Math.floor((timestamp / 3600) ^ 0);
  const minutes = Math.floor(((timestamp - hours * 3600) / 60) ^ 0);
  const seconds = Math.floor(timestamp - hours * 3600 - minutes * 60);

  const hoursSrt = hours.toString().length === 1 ? `0${hours}` : hours;
  const minutesSrt = minutes.toString().length === 1 ? `0${minutes}` : minutes;
  const secondsSrt = seconds.toString().length === 1 ? `0${seconds}` : seconds;

  const formatted = hoursSrt + ':' + minutesSrt + ':' + secondsSrt;
  return formatted;
};
