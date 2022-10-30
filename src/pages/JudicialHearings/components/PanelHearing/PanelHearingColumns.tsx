import { Badge } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import { getListDataDocByType, getDateInFormat } from 'utils/app_helper';
import { CellListIconLink } from 'components';
import { ButtonOpenHearing } from '../ButtonOpenHearing';
import { VALUE_RESULT_JUDICIAL_HEARINGS } from './PanelHearingConstants';
import ButtonDeleteHearing from '../ButtonDeleteHearing/ButtonDeleteHearing';
import HearingStatusDropdown from "../HearingStatusDropdown/HearingStatusDropdown";
import React from "react";

export const columnsTable = [
  {
    dataField: 'number',
    text: '№',
    sort: true,
  },
  {
    dataField: 'date',
    text: 'Дата',
    sort: true,
    formatter: getDateInFormat,
  },
  // {
  //   dataField: 'participants',
  //   text: 'Состав',
  //   sort: true,
  //   formatter: (cellContent: IParticipants[], row: { id: number }) => {
  //     const TooltiContent = (
  //       <DotsTooltip idTarget={`participant_${row.id}`}>
  //         <ListParticipants listParticipants={cellContent} />
  //       </DotsTooltip>
  //     );

  //     return (
  //       <>
  //         <ListParticipants listParticipants={cellContent.slice(0, 3)} />
  //         {cellContent.length > 3 && TooltiContent}
  //       </>
  //     );
  //   },
  // },
  {
    dataField: 'result',
    text: 'Результат',
    sort: true,
    formatter: (cellContent: string, row: any) => {
      return (
        <HearingStatusDropdown hearingInfo={row}>
          <Badge
            pill
            className={`rounded-pill badge-soft-${cellContent} bg-${cellContent} ms-1 px-2`}
          >
            {VALUE_RESULT_JUDICIAL_HEARINGS[cellContent]}
          </Badge>
          <i className='bx bx-chevron-down font-size-18'/>
          {cellContent === 'planned' && (
            <div className='p-2'>
              Дата: {row.date} <br />
              Время: {row.time}
            </div>
          )}
        </HearingStatusDropdown>
      );
    },
  },
  {
    dataField: 'documentation',
    text: 'Документы',
    sort: true,
    formatter: (cellContent: []) => {
      return getListDataDocByType(cellContent).map(dataDoc => (
        <CellListIconLink
          key={uuidv4()}
          link={''}
          icon={dataDoc.icon}
          title={dataDoc.name}
        />
      ));
    },
  },

  {
    dataField: 'button',
    isDummyField: true,
    text: '',
    sort: false,
    // eslint-disable-next-line react/display-name
    formatter: (_, row: { id: string; number: number }) => (
      <div className='d-flex align-items-center justify-content-end'>
        <ButtonDeleteHearing hearingId={row.id} hearingName={row.number} />
        <ButtonOpenHearing hearingId={row.id} />
      </div>
    ),
  },
];
