import { User } from '../../../store/userList/types';
import {IJudicialCasesItemAdd} from "../../../store/judicialCases/types";

export interface IPropsCreateCase{
  user?: User | null;
  isOpen: boolean;
  closeModal: () => void;
  actionModal?: () => void;
  addJudicialCases: (obj: IJudicialCasesItemAdd) => void;
}
