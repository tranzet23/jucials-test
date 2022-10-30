import { User } from '../../../store/userList/types';

export interface IPropsUserDelete {
  user: User | null;
  isOpen: boolean;
  closeModal: () => void;
  actionModal: () => void;
}
