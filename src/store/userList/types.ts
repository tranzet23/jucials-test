export interface User {
  user_id: number;
  surname: string;
  name: string;
  lastname: string;
  firstname: string;
  username: string;
  position: string;
  role_id: number;
  password: string;
  area_id: number;
  role_name: string;
  date_registration: string;
}

export interface IListUsersState {
  isPreloader: boolean;
  error: any;
  listUsers: User[];
}
