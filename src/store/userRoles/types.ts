export interface IUserAccessRoles {
  name: string;
  right_id: string;
  title: string;
  children: IAccessRole[];
}

export interface IAccessRole {
  name: string;
  right_id: string;
  title: string;
  access: boolean;
}

export type UserRolesMessageType = 'add' | 'error' | 'edit' | null;
