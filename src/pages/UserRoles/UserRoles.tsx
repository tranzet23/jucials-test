import { Breadcrumbs } from 'components';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { RootState } from 'store/reducers';
import {
  deleteUserRoles,
  fetchUserRoles,
  setUserRolesModalCondition,
} from 'store/userRoles/actions';
import UserRolesDeleteModal from './components/UserDeleteModal/UserRolesDeleteModal';
import UserRolesTable from './components/UserRolesTable/UserRolesTable';

interface IUSerRoles {
  fetchUserRoles: () => void;
  itemToDelete: any;
  modalActive: boolean;
  setUserRolesModalCondition: () => void;
  deleteUserRoles: (id: number) => void;
}

export const UserRoles = ({
  fetchUserRoles,
  itemToDelete,
  modalActive,
  setUserRolesModalCondition,
  deleteUserRoles,
}: IUSerRoles) => {
  useEffect(() => {
    fetchUserRoles();
  }, [fetchUserRoles]);

  return (
    <>
      <Breadcrumbs
        title={'Список ролей пользователей'}
        breadcrumbItems={['Роли пользователей', 'Список']}
      />
      <Row>
        <Col xc='12'>
          <Card className='userroles-card-wrapper'>
            <CardBody>
              <UserRolesTable />
              <UserRolesDeleteModal
                active={modalActive}
                item={itemToDelete}
                closeHandler={setUserRolesModalCondition}
                deleteHandler={deleteUserRoles}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  const { modalActive, itemToDelete } = state.UserRoles;
  return { modalActive, itemToDelete };
};

const mapDispatchToProps = {
  fetchUserRoles,
  setUserRolesModalCondition,
  deleteUserRoles,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRoles);
