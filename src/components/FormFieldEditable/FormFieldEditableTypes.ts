export interface IFormFieldEditableProps {
  isEditRow?: boolean | string;
  name: string;
  value: string;
  setStatusEdit: () => void;
  setStatusEdited: () => void;
}
