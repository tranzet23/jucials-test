import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';

interface IUserRolesEditBtn extends RouteComponentProps {
  currentId: string;
}

const UserRolesEditBtn = ({ currentId }: IUserRolesEditBtn) => {
  return (
    <Link to={`/usersRoles/edit/${+currentId}`}>
      <Button className='userroles-btn-edit w-lg' color='primary' outline>
        Редактировать роль
      </Button>
    </Link>
  );
};

export default withRouter(UserRolesEditBtn);
