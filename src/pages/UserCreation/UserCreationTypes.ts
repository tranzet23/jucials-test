import { RouteComponentProps } from 'react-router-dom';
import { AddUser, ICreatedUserState } from '../../store/userCreation/types';

export interface IUserCreation extends RouteComponentProps {
  userCreation: (user: AddUser) => {};
  creationUserState: ICreatedUserState;
  addCreation: (data, history) => {};
  editUser: (data, history) => {};
  cleanState: () => void;
  match: any;
  loadUser: (data) => {};
  error: string | null;
  loadListRoles: () => void;
  loadJudicialSectors: (boolean) => {};
  listJudicialSectors: {
    district_id: string;
    address: string;
    classification_code: string;
    district: string;
    judge: string;
  }[];
}
