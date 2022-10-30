import { FieldInputProps } from 'formik';

export interface IFormAddParticipantProps extends FieldInputProps<''> {
  onOpen: (isOpen: boolean) => void;
}
