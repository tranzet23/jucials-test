import React from 'react';
import { Redirect } from 'react-router-dom';

import {
  Authentication,
  Logout,
  JudicialHearings,
  JudicialCases,
  JudicialSectors,
  UserCreation,
  UsersList,
  UserRoles,
  UserRolesForm,
  EditTemplates,
  TranscriptionPage,
} from 'pages';

const PUBLIC_ROUTES = {
  LOGIN: {
    name: 'Авторизация',
    path: '/login',
    pathTransition: '/login',
    component: Authentication,
  },
  LOGOUT: {
    name: 'Выход',
    path: '/logout',
    pathTransition: '/logout',
    component: Logout,
  },
};

const AUTH_PROTECTED_ROUTES = {
  // {
  //   id: 'JudicialSectors',
  //   path: '/JudicialSectors/list',
  //   component: JudicialSectorsPage,
  //   userType: 'admin',
  //   icon: 'bx-buildings',
  // },

  JUDICIAL_SECTORS: {
    id: 'areas',
    name: 'Судебные участки',
    path: '/judicialSectors',
    pathTransition: '/judicialSectors',
    component: JudicialSectors,
    userType: 'admin',
    icon: 'bx-buildings',
  },
  USERS_ROLES: {
    id: 'roles',
    name: 'Роли пользователей',
    path: '/usersRoles/list',
    pathTransition: '/usersRoles/list',
    component: UserRoles,
    userType: 'admin',
    icon: 'bx bxs-user-badge',
  },
  USER_EDIT: {
    id: 'userEdit',
    name: 'Редактирование пользователей',
    path: '/userEdit/:id',
    pathTransition: '/userEdit',
    component: UserCreation,
    userType: '',
    icon: 'bx-user-circle',
  },

  USER_CREATION: {
    id: 'userEdit',
    name: 'Создание пользователей',
    path: '/userCreation',
    pathTransition: '/userCreation',
    component: UserCreation,
    userType: '',
    icon: 'bx-user-circle',
  },

  USERS_LIST: {
    id: 'users',
    name: 'Пользователи',
    path: '/users',
    pathTransition: '/users',
    component: UsersList,
    userType: 'admin',
    icon: 'bx-user-circle',
  },

  JUDICIAL_CASES: {
    id: 'cases',
    name: 'Список дел',
    path: '/judicialCases',
    pathTransition: '/judicialCases',
    component: JudicialCases,
    userType: 'user',
    icon: 'bx-calendar',
  },

  USERS_ROLES_ADD: {
    id: 'userRolesForm',
    name: 'Cоздание Роли пользователя',
    path: '/usersRoles/add/',
    pathTransition: '/usersRoles/add/',
    component: UserRolesForm,
    userType: '',
    icon: 'bx bxs-user-badge',
  },
  USERS_ROLES_EDIT: {
    id: 'userRolesForm',
    name: 'Изменение Роли пользователя',
    path: '/usersRoles/edit/:roleId',
    pathTransition: '/usersRoles/edit/:roleId',
    component: UserRolesForm,
    userType: '',
    icon: 'bx bxs-user-badge',
  },

  JUDICIAL_HEARINGS: {
    id: 'meetings',
    name: 'Судебные заседания',
    path: '/judicialHearings',
    pathTransition: '/judicialHearings',
    component: JudicialHearings,
    userType: '',
    icon: 'bx-calendar',
  },

  TRANSCRIPTION: {
    id: 'transcription',
    name: 'Транскрипция заседания',
    path: '/transcription/data',
    pathTransition: '/transcription/data',
    component: TranscriptionPage,
    userType: '',
    icon: 'bx-calendar',
  },

  TEMPLATES_EDIT: {
    id: 'templatesEdit',
    name: 'Редактирование шаблона',
    path: '/templates/edit/:templateId',
    pathTransition: '/templates/edit/:templateId',
    component: EditTemplates,
    userType: '',
    icon: 'bx-calendar',
  },
  TEMPLATES_ADD: {
    id: 'templatesEdit',
    name: 'Добавление шаблона',
    path: '/templates/add',
    pathTransition: '/templates/add',
    component: EditTemplates,
    userType: '',
    icon: 'bx-calendar',
  },
  SAVED_DOCUMENT_EDIT: {
    id: 'savedDocumentEdit',
    name: 'Редактирование документа',
    path: '/documents/edit/:documentId',
    pathTransition: '/documents/edit/:documentId',
    component: EditTemplates,
    userType: '',
    icon: 'bx-calendar'
  },

  DEFAULT: {
    id: '',
    name: '',
    path: '/',
    pathTransition: '/',
    exact: true,
    userType: '',
    icon: 'bx-user-circle',
    component: () => <Redirect from='/' to='/judicialCases' />,
  },
};

const publicRoutes = Object.values(PUBLIC_ROUTES);
const authProtectedRoutes = Object.values(AUTH_PROTECTED_ROUTES);
export {
  authProtectedRoutes,
  publicRoutes,
  PUBLIC_ROUTES,
  AUTH_PROTECTED_ROUTES,
};
