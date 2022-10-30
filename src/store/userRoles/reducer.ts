import { ActionType } from './actionTypes';
import { IUserAccessRoles } from './types';

interface InitialState {
  roles: any[];
  modalActive: boolean;
  currentItem: IUserAccessRoles | null;
  itemToDelete: { id: string; name: string } | null;
  accessRoles: [];
  message: null | 'success' | 'error';
}
const initialState: InitialState = {
  roles: [],
  modalActive: false,
  currentItem: null,
  itemToDelete: null,
  accessRoles: [],
  message: null,
};

const UserRolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ACCESS_USER_ROLES:
      return { ...state, accessRoles: action.payload };

    case ActionType.SET_USER_ROLES:
      const listUsers = !!action.payload
        ? action.payload.length
          ? action.payload
          : [action.payload]
        : [];

      return { ...state, roles: listUsers };
    case ActionType.SET_USER_ROLES_MODAL:
      const item = state.roles.find(item => item.role_id === action.payload.id);
      return {
        ...state,
        modalActive: action.payload.condition,
        itemToDelete: { id: item?.role_id, name: item?.name },
      };

    case ActionType.SET_USER_ROLE_EDIT:
      return {
        ...state,
        currentItem: action.payload,
      };
    case ActionType.SET_USER_ROLES_MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

export default UserRolesReducer;
