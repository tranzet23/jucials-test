import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { RootState } from 'store/reducers';
import { IUserAccessRoles } from 'store/userRoles/types';
import { Table } from 'components';
import { columnsTable } from './UserRolesColumns';

interface IUserRolesTable extends RouteComponentProps {
  roles: IUserAccessRoles[];
}

const UserRolesTable = ({ roles }: IUserRolesTable) => {
  return <Table data={roles} columns={columnsTable} keyField='role_id' />;
};

const mapStateToProps = (state: RootState) => {
  const { roles } = state.UserRoles;
  return { roles };
};

export default connect(mapStateToProps, {})(withRouter(UserRolesTable));
