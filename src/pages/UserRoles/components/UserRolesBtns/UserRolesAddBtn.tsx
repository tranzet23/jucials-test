import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';

const UserRolesAddBtn = () => {
  return (
    <Link to={'/usersRoles/add'}>
      <Button className='userroles-btn-add table__button' color='primary'>
        Создать роль пользователя
      </Button>
    </Link>
  );
};

export default withRouter(UserRolesAddBtn);
