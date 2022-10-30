import { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import { FieldArray } from 'formik';
import { ucFirst, getRandomInt } from 'utils/app_helper';
import { FormFieldEditable } from 'components';
import { COLUMNS_TABLE_PARTICIPANTS } from './FormAddParticipantConstant';
import { IFormAddParticipantProps } from './FormAddParticipantTypes';

const FormAddParticipant = ({
  values,
  isResetEditing,
}: IFormAddParticipantProps): JSX.Element => {
  const [listRowForEdit, setListRowForEdit] = useState<string[]>([]);

  useEffect(() => {
    setListRowForEdit([]);
  }, [isResetEditing]);

  const onAddRowForEdit = (item: string) => {
    return () => {
      setListRowForEdit([...listRowForEdit, item]);
    };
  };

  const onDeleteRowForEdit = (item: string) => {
    return () => {
      setListRowForEdit(
        listRowForEdit.filter(rowEditing => rowEditing !== item),
      );
    };
  };

  return (
    <FieldArray name='participants'>
      {({ remove, push }) => (
        <>
          <div className='d-flex align-items-center'>
            <h6 className='col-sm'>
              <strong>Состав участников заседания:</strong>
            </h6>
            <i
              className='bx bx-user-plus h2 text-primary'
              onClick={() => {
                const id = getRandomInt(100).toString();
                setListRowForEdit(list => [...list, id]);
                push({
                  id,
                });
              }}
            />
          </div>

          <Table className='table align-middle mb-0 table-nowrap'>
            <thead className='table-light'>
              <tr>
                {COLUMNS_TABLE_PARTICIPANTS.map(column => (
                  <th key={`column__${column.dataField}`}>{column.text}</th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {values?.participants.map((participant, index: number) => {
                const isEditRow = listRowForEdit.find(
                  rowEdit => rowEdit === participant.id,
                );

                return (
                  <tr key={participant.id}>
                    <td>
                      <FormFieldEditable
                        isEditRow={isEditRow}
                        name={`participants.${index}.type`}
                        value={ucFirst(participant.type)}
                        setStatusEdit={onAddRowForEdit(participant.id)}
                        setStatusEdited={onDeleteRowForEdit(participant.id)}
                      />
                    </td>
                    <td>
                      <FormFieldEditable
                        isEditRow={isEditRow}
                        name={`participants.${index}.lastname`}
                        value={participant.lastname}
                        setStatusEdit={onAddRowForEdit(participant.id)}
                        setStatusEdited={onDeleteRowForEdit(participant.id)}
                      />
                    </td>
                    <td>
                      <FormFieldEditable
                        isEditRow={isEditRow}
                        name={`participants.${index}.name`}
                        value={participant.name}
                        setStatusEdit={onAddRowForEdit(participant.id)}
                        setStatusEdited={onDeleteRowForEdit(participant.id)}
                      />
                    </td>
                    <td>
                      <FormFieldEditable
                        isEditRow={isEditRow}
                        name={`participants.${index}.surname`}
                        value={participant.surname}
                        setStatusEdit={onAddRowForEdit(participant.id)}
                        setStatusEdited={onDeleteRowForEdit(participant.id)}
                      />
                    </td>

                    <td className='form-edit-row'>
                      <i
                        className={`mdi font-size-18 ${
                          isEditRow ? 'mdi-check' : 'mdi-pencil-outline'
                        }`}
                        onClick={
                          isEditRow
                            ? onDeleteRowForEdit(participant.id)
                            : onAddRowForEdit(participant.id)
                        }
                      />
                      <i
                        onClick={() => remove(index)}
                        className='mdi pl-2 mdi-trash-can-outline font-size-18'
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </FieldArray>
  );
};
export default FormAddParticipant;
