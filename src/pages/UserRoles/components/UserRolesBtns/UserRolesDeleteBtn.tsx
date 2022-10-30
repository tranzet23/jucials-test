import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { setUserRolesModalCondition } from 'store/userRoles/actions';

const UserRolesDeleteBtn = ({ setUserRolesModalCondition, deleteId }) => {
  const clickHandler = () => {
    setUserRolesModalCondition(true, deleteId);
  };
  return (
    <Button
      className='table__button w-lg'
      outline
      color='secondary'
      onClick={clickHandler}
    >
      Удалить роль
    </Button>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = { setUserRolesModalCondition };
export default connect(mapStateToProps, mapDispatchToProps)(UserRolesDeleteBtn);
