import { IListUsersState } from '../../store/userList/types';

export interface IUserList {
  creationUserList: IListUsersState;
  loadUsersList: (data) => {};
  deleteUser: (data) => {};
}
