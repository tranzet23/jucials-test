import { getDateInFormat } from 'utils/app_helper';
import { EditBtn, DeleteBtn, OpenBtn } from './components';
import { IJudicialCasesItem, sortOrder } from './JudicialCasesTableTypes';
import CaseEndingDateDropdown from '../CaseEndingDateDropdown/CaseEndingDateDropdown';

export const judicialCasesRenderPeopleType = (data, sort = false) => {
  if (
    !data ||
    !data.person_type ||
    (data.person_type === 'individual' &&
      !data.name &&
      !data.lastname &&
      !data.surname) ||
    (data.person_type === 'legal_entity' && !data.company)
  ) {
    return 'Некорректное имя';
  }
  if (sort) {
    return data.person_type === 'legal_entity'
      ? data.company
      : `${data.lastname}`;
  }
  return data.person_type === 'legal_entity'
    ? data.company
    : `${data?.lastname + ' ' + data?.name + ' ' + data?.surname}`;
};

export const columnsTable = [
  {
    dataField: 'uid',
    headerClasses: '',
    text: 'УИД',
    sort: true,
    headerSortingClasses: (_: any, sortOrder: sortOrder) => {
      if (sortOrder === 'desc') {
        return 'courtcases-table-header-item-sorted';
      }
      return;
    },
  },
  {
    dataField: 'case_id',
    headerClasses: '',
    headerSortingClasses: (_: any, sortOrder: sortOrder) => {
      if (sortOrder === 'desc') {
        return 'courtcases-table-header-item-sorted';
      }
      return;
    },
    text: '№ дела',
    sort: true,
  },

  {
    dataField: 'plaintiff',
    headerClasses: '',
    headerSortingClasses: (_: any, sortOrder: sortOrder) => {
      if (sortOrder === 'desc') {
        return 'courtcases-table-header-item-sorted';
      }
      return;
    },
    text: 'Истец',
    sort: true,

    formatter: row => {
      const content = judicialCasesRenderPeopleType(row);
      return <>{content}</>;
    },
    sortFunc: (a, b, order) => {
      const aContent = judicialCasesRenderPeopleType(a, true);
      const bContent = judicialCasesRenderPeopleType(b, true);

      if (order === 'asc') {
        if (aContent > bContent) {
          return 1;
        }
        return -1;
      } else {
        if (aContent > bContent) {
          return -1;
        }
        return 1;
      }
    },
  },

  {
    dataField: 'defendant',
    headerClasses: '',
    headerSortingClasses: (_: any, sortOrder: sortOrder) => {
      if (sortOrder === 'desc') {
        return 'courtcases-table-header-item-sorted';
      }
      return;
    },
    text: 'Ответчик',
    sort: true,
    formatter: row => {
      const content = judicialCasesRenderPeopleType(row);

      return <>{content}</>;
    },
    sortFunc: (a, b, order) => {
      const aContent = judicialCasesRenderPeopleType(a, true);
      const bContent = judicialCasesRenderPeopleType(b, true);

      if (order === 'asc') {
        if (aContent > bContent) {
          return 1;
        }
        return -1;
      } else {
        if (aContent > bContent) {
          return -1;
        }
        return 1;
      }
    },
  },
  {
    dataField: 'start',
    headerClasses: '',
    headerSortingClasses: (_: any, sortOrder: sortOrder) => {
      if (sortOrder === 'desc') {
        return 'courtcases-table-header-item-sorted';
      }
      return;
    },
    text: 'Начато',

    sort: true,
    formatter: getDateInFormat,
  },
  {
    dataField: 'end',
    headerClasses: '',
    headerSortingClasses: (_: any, sortOrder: sortOrder) => {
      if (sortOrder === 'desc') {
        return 'courtcases-table-header-item-sorted';
      }
      return;
    },
    text: 'Окончено',
    sort: true,

    formatter: (_, item: IJudicialCasesItem) => (
      <CaseEndingDateDropdown currentItem={item} />
    ),
  },

  {
    dataField: 'add',
    headerClasses: 'courtcases-table-header-item-7',
    text: '',
    sort: false,
    formatter: (_: any, item: IJudicialCasesItem) => {
      return (
        <div className='table-btnWrapper'>
          <EditBtn />
          <DeleteBtn currentItem={item} />
          <OpenBtn caseId={item.id} />
        </div>
      );
    },
  },
];
