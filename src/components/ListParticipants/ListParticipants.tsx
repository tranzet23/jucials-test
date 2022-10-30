import { IListParticipantsProps } from './ListParticipantsTypes';
import { ucFirst, getTheFirstLetter } from 'utils/app_helper';
import { v4 as uuidv4 } from 'uuid';

const ListParticipants = ({
  listParticipants,
}: IListParticipantsProps): JSX.Element => {
  if (listParticipants.length < 1) return <></>;

  return (
    <>
      {listParticipants.map(participant => {
        const nameParticipant = [
          ' ',
          participant.lastname,
          ' ',
          getTheFirstLetter(participant.name),
          '.',
          getTheFirstLetter(participant.surname),
          '.',
        ].join('');

        return (
          <p key={`participants_${uuidv4()}`} className='m-0'>
            <strong>{ucFirst(participant.type)}: </strong>
            {nameParticipant}
          </p>
        );
      })}
    </>
  );
};

export default ListParticipants;
