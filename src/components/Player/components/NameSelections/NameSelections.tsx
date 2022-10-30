import React from 'react';
import { Field, useFormikContext } from 'formik';
import { INameSelectionsProps } from './NameSelectionsTypes';
import { IMultiChannelForm } from '../../PlayerTypes';
import { getTheFirstLetter } from 'utils/app_helper';

export default function NameSelections({
  hearingData,
  channelsNumber,
}: INameSelectionsProps) {
  const { values, setFieldValue, submitForm } =
    useFormikContext<IMultiChannelForm>();

  // useEffect(() => {
  //   let colors: {}[] = [];
  //   if (values.channels) {
  //     for (let row of values.channels) {
  //       console.log(row.color)
  //       console.log(Boolean(row.color))
  //       colors.push({progressColor: row.color === 'null' || !Boolean(row.color) ? '#4353FF' : row.color})
  //     }
  //     setWaveColors(colors)
  //   }
  // }, [values, setWaveColors])

  // useEffect(() => {
  //   window.addEventListener('beforeunload', submitForm);
  //   return () => {
  //     window.removeEventListener('beforeunload', submitForm);
  //     submitForm();
  //   };
  // }, [submitForm]);

  if (!values.channels || !hearingData) {
    return null;
  }

  hearingData?.participants.sort((a, b) => a.id - b.id);

  return (
    <>
      {Array.from({ length: channelsNumber }, (x, i) => (
        <Field
          as='select'
          name={`channels.${i}.id`}
          key={`participant_${i}`}
          className='form-select multi-channel__select'
          onChange={e => {
            // Не позволяет выбрать один и тотже канал
            let changeTo = parseInt(e.target.value);

            let replaceIndex = values.channels
              .filter(el => el)
              .findIndex(person => person.id !== 0 && person.id === changeTo);
            let changeToItem = hearingData?.participants.find(
              person => person.id === changeTo,
            );
            if (changeToItem) {
              changeToItem.channel = (i + 1).toString();
            }

            if (changeTo === 0) {
              // Клик по полю "Выберете роль"
              setFieldValue(`channels.${i}`, {
                id: 0,
                color: '#4353FF',
                channel: '0',
              });
            } else {
              if (replaceIndex !== -1) {
                setFieldValue(`channels.${replaceIndex}`, {
                  id: 0,
                  color: '#4353FF',
                  channel: '0',
                });
              }
              setFieldValue(`channels.${i}`, changeToItem);
            }
            submitForm();
          }}
        >
          <option key={'0'} value={0}>
            Выберете роль
          </option>
          {hearingData?.participants.map((participant, optionIndex) => (
            <option key={`${i}.${optionIndex}`} value={participant.id}>
              {`${participant.lastname} ${
                participant.name
                  ? getTheFirstLetter(participant.name) + '.'
                  : ''
              } ${
                participant.surname
                  ? getTheFirstLetter(participant.surname) + '.'
                  : ''
              }`}
            </option>
          ))}
        </Field>
      ))}
    </>
  );
}
