import { IJudicialCasesItemAdd } from 'store/judicialCases/types';

export interface IDeleteModal {
  closeHandler: () => void;
  submitHandler: any;

  currentItem: IJudicialCasesItemAdd;
  isOpen: boolean;
}
