import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Row, Spinner, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDateInFormat } from 'utils/app_helper';
import { RootState } from 'store/reducers';
import { deleteUser, loadUsersList } from 'store/userList/actions';
import { AUTH_PROTECTED_ROUTES } from 'navigation';
import UserDelete from 'components/Modal/UserDelete/UserDelete';
import { Breadcrumbs } from 'components';
import { User } from 'store/userList/types';
import { IUserList } from './UsersListTypes';

const UsersList = (props: IUserList) => {
  const { loadUsersList } = props;
  const [assets, setAssets] = useState<User[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadUsersList(true);
  }, [loadUsersList]);

  useEffect(() => {
    setAssets(props.creationUserList.listUsers);
  }, [props.creationUserList.listUsers]);

  const onDelete = user => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const pathUserAdd = () => {
    let path = AUTH_PROTECTED_ROUTES.USER_CREATION.pathTransition;
    return path;
  };

  const pathUserEdit = id => {
    let path = AUTH_PROTECTED_ROUTES.USER_EDIT.pathTransition;
    return `${path}/${id}`;
  };

  const onCloseModal = () => {
    setShowDeleteModal(false);
  };

  const deleteSelectedUser = () => {
    !!selectedUser && props.deleteUser(selectedUser['user_id']);
    onCloseModal();
  };

  const assetsTable =
    assets.length === 0 ? (
      <tbody>
        <tr>
          <th scope='row'>
            <div className='d-flex align-items-center'>Нет данных</div>
          </th>
        </tr>
      </tbody>
    ) : (
      <tbody>
        {assets.map(asset => (
          <tr key={asset.user_id}>
            <th scope='row'>
              <div className='d-flex align-items-center'>
                <div className='user_list_no_avatar'>
                  {asset.name.substring(0, 1)}
                </div>
              </div>
            </th>
            <td>
              <div className='font-size-14'>
                {asset.lastname} {asset.name} {asset.surname}
              </div>
            </td>
            <td>
              <div className='font-size-14'>{asset.position}</div>
            </td>
            <td>
              <div className='font-size-14'>{asset.role_name}</div>
            </td>
            <td>
              <div className='font-size-14'>
                {getDateInFormat(asset.date_registration)}
              </div>
            </td>
            <td className='d-flex'>
              <Link
                to={pathUserEdit(asset.user_id)}
                className='btn btn-outline-primary w-lg'
                style={{ marginRight: '20px' }}
                onClick={() => {}}
              >
                Редактировать
              </Link>
              <Link
                to='#'
                className='btn btn-outline-secondary w-lg'
                onClick={() => onDelete(asset)}
              >
                Удалить
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    );
  const content = props.creationUserList.isPreloader ? (
    <Spinner>Loading...</Spinner>
  ) : (
    <Table className='table table-nowrap align-middle mb-0'>
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>ФИО</th>
          <th scope='col'>Должность</th>
          <th scope='col'>Роль</th>
          <th scope='col'>Дата&nbsp;создания</th>
          <th scope='col' className='table__header-button-wrapper'>
            <Link
              to={pathUserAdd}
              className='btn btn-primary d-flex justify-content-center'
            >
              Создать пользователя
            </Link>
          </th>
        </tr>
      </thead>
      {assetsTable}
    </Table>
  );

  return (
    <>
      <Breadcrumbs
        title='пользователи'
        breadcrumbItems={['Пользователи', 'Создание']}
      />
      <Row>
        <Col xl='12'>
          <Card>
            <CardBody>{content}</CardBody>
          </Card>
        </Col>
      </Row>
      <UserDelete
        user={selectedUser}
        isOpen={showDeleteModal}
        closeModal={onCloseModal}
        actionModal={deleteSelectedUser}
      />
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  const creationUserList = state.UsersList;

  return { creationUserList, state };
};

export default connect(mapStateToProps, { loadUsersList, deleteUser })(
  UsersList,
);
