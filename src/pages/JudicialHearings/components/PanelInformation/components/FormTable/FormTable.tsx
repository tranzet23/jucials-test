import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { updateModeHearing } from 'store/actions';
import { VALUE_FIELDS_FOR_FORM } from 'constants/app_сonstants';
import { FormFieldEditable } from 'components';

const ControllerHearing = ({ data, rows, name, isResetEditing }) => {
  const [listRowForEdit, setListRowForEdit] = useState<string[]>([]);

  useEffect(() => {
    setListRowForEdit([]);
  }, [isResetEditing]);

  if (!data || !rows) return null;

  const onAddRowForEdit = (key: string) => {
    return () => {
      setListRowForEdit([...listRowForEdit, key]);
    };
  };

  const onDeleteRowForEdit = (key: string) => {
    return () => {
      setListRowForEdit(
        listRowForEdit.filter(rowEditing => rowEditing !== key),
      );
    };
  };

  return (
    <Table className='table align-middle mb-0 table-nowrap'>
      <tbody>
        {rows.map((key: string) => {
          const isEditRow = listRowForEdit.find(rowEdit => rowEdit === key);

          return (
            <tr key={'_orderSummary_' + key}>
              <th scope='row'>
                <strong> {VALUE_FIELDS_FOR_FORM[key]}:</strong>
              </th>

              <td>
                <FormFieldEditable
                  isEditRow={isEditRow}
                  name={`${name}.${key}`}
                  value={data[key]}
                  setStatusEdit={onAddRowForEdit(key)}
                  setStatusEdited={onDeleteRowForEdit(key)}
                />
              </td>
              <td className='form-edit-row'>
                <i
                  className={`mdi font-size-18 ${
                    isEditRow ? 'mdi-check' : 'mdi-pencil-outline'
                  }`}
                  onClick={
                    isEditRow ? onDeleteRowForEdit(key) : onAddRowForEdit(key)
                  }
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default connect(() => ({}), { updateModeHearing })(ControllerHearing);
