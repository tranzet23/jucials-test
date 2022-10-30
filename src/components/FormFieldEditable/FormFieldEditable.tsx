import { Field } from 'formik';
import { IFormFieldEditableProps } from './FormFieldEditableTypes';

const FormFieldEditable = ({
  isEditRow,
  name,
  value,
  setStatusEdit,
  setStatusEdited,
}: IFormFieldEditableProps) => {
  return isEditRow ? (
    <Field
      className='form-control'
      type='text'
      name={name}
      onKeyPress={e => {
        if (e.charCode === 13) {
          setStatusEdited();
        }
      }}
      value={value || ''}
    />
  ) : (
    <div onClick={setStatusEdit} className='field__text'>
      {value}
    </div>
  );
};

export default FormFieldEditable;
