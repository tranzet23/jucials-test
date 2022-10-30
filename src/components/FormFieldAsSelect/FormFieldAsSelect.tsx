import {Field} from 'formik';
import { IFormFieldAsSelectProps } from './FormFieldAsSelectTypes';

const FormFieldAsSelect = (props: IFormFieldAsSelectProps) => {
  const { fieldName } = props;
  return (
    <Field
      id={`fieldAsSelect_${fieldName}`}
      as='select'
      name={fieldName}
      className='form-select'
    >
      {props.children}
    </Field>
  );
};
export default FormFieldAsSelect;
