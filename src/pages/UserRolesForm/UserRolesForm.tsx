import { Breadcrumbs } from 'components';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Link,
  Redirect,
  RouteComponentProps,
  useParams,
  withRouter,
} from 'react-router-dom';
import { Alert, Button, Card, CardBody, Input } from 'reactstrap';
import { RootState } from 'store/reducers';
import {
  addUserRoles,
  fetchUserAccessRoles,
  getUserRole,
  setUserRole,
  setUserRolesMessage,
  updateUserRoles,
} from 'store/userRoles/actions';
import { IUserAccessRoles, UserRolesMessageType } from 'store/userRoles/types';
import { UserRolesCard } from './components/UserRolesCard';
interface IUserRolesForm extends RouteComponentProps {
  message: UserRolesMessageType;
  accessRoles: IUserAccessRoles[];
  currentItem: any | null;
  addUserRoles: (payload: any) => void;
  updateUserRoles: (payload: any) => void;
  getUserRole: (id: number) => void;
  setUserRole: (data: any) => void;
  fetchUserAccessRoles: () => void;
  setUserRolesMessage: (msg: UserRolesMessageType) => void;
}

const messageTypes = {
  add: 'Роль успешно добавлена',
  edit: 'Роль успешно обновлена',
  error: 'Что-то пошло не так',
};

export const UserRolesForm = ({
  message,
  accessRoles,
  currentItem,
  addUserRoles,
  updateUserRoles,
  setUserRole,
  getUserRole,
  fetchUserAccessRoles,
  setUserRolesMessage,
}: IUserRolesForm) => {
  const { roleId } = useParams<{ roleId: string }>();

  useEffect(() => {
    if (!roleId) {
      fetchUserAccessRoles();
    }
  }, [roleId, fetchUserAccessRoles]);

  useEffect(() => {
    if (roleId !== undefined) {
      getUserRole(+roleId);
    }
    return () => {
      setUserRole(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleId, getUserRole]);
  useEffect(() => {
    setUserRolesMessage(null);

    return () => {
      setUserRolesMessage(null);
    };
  }, [setUserRolesMessage]);

  const formik = useFormik({
    initialValues: {
      role_id: '',
      name: '',
      rights: [...accessRoles],
    },
    onSubmit: values => {
      const user = {
        ...values,
        role_id: +values.role_id,
      };

      return currentItem ? updateUserRoles(user) : addUserRoles(user);
    },
  });
  useEffect(() => {
    if (!formik.values.role_id) {
      formik.setValues({ ...formik.values, rights: [...accessRoles] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessRoles]);

  useEffect(() => {
    if (currentItem) {
      const newRights = JSON.parse(JSON.stringify(formik.values.rights));
      currentItem?.rights.forEach((blockItem, blockIndex) => {
        blockItem?.children.forEach((element, currentIndex) => {
          newRights[blockIndex].children[currentIndex].access = element.access;
        });
      });

      formik.setValues({ ...currentItem, rights: newRights });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentItem]);

  return (
    <>
      <Breadcrumbs
        title={
          roleId ? 'Изменение роли пользователя' : 'Создание роли пользователя'
        }
        breadcrumbItems={['Роли', `${roleId ? 'Изменение' : 'Создание'}`]}
      />
      <div className='userroles-form-wrapper'>
        <form onSubmit={formik.handleSubmit}>
          <Card className='userroles-form-name-card'>
            <CardBody className='userroles-form-name-cardbody'>
              <div className='userroles-form-name-title'>
                Название роли пользователя
              </div>
              <div className='userroles-form-name-input-wrapper'>
                <Input
                  className='userroles-form-name-input'
                  name='name'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </div>
            </CardBody>
          </Card>
          <div className='userroles-form-access-hr'>
            Права доступа к подсистемам
          </div>
          <div className='userroles-form-items-container'>
            {formik.values.rights &&
              formik.values.rights.map((item, i) => (
                <UserRolesCard
                  key={`${item.name}_${item.right_id}`}
                  index={i}
                  item={item}
                  values={formik.values.rights[i]}
                  handler={formik.handleChange}
                  setHandler={formik.setFieldValue}
                />
              ))}
          </div>
          <div className='userroles-form-items-btns-wrapper'>
            <Link to={'/usersRoles/list'}>
              <Button
                color='secondary'
                className='userroles-form-items-btn-cancel'
              >
                Отмена
              </Button>
            </Link>
            <Button
              type='submit'
              color='primary'
              className='userroles-form-items-btn-submit'
            >
              Сохранить
            </Button>
          </div>
        </form>
        {message ? (
          message === 'add' || message === 'edit' ? (
            <Redirect to='/usersRoles/list' />
          ) : (
            <Alert color='danger'>{messageTypes[message]}</Alert>
          )
        ) : null}
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  const { currentItem, accessRoles, message } = state.UserRoles;
  return { currentItem, accessRoles, message };
};

const mapDispatchToProps = {
  addUserRoles,
  fetchUserAccessRoles,
  updateUserRoles,
  getUserRole,
  setUserRole,
  setUserRolesMessage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(UserRolesForm));
