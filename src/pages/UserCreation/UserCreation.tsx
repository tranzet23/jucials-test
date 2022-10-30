import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import generator from 'generate-password';
import { useFormik, Formik } from 'formik';
import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation-safe';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  FormGroup,
  Label,
  Row,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { RootState } from 'store/reducers';
import {
  userCreation,
  addCreation,
  editUser,
  loadUser,
  cleanState,
  loadListRoles,
} from 'store/userCreation/actions';
import { IUserCreation } from './UserCreationTypes';
import { AUTH_PROTECTED_ROUTES } from 'navigation';
import { loadJudicialSectors } from 'store/actions';
import FormCourtSectors from 'components/FormCourtSectors/FormCourtSectors';
import { AddUser } from 'store/userCreation/types';

function randomNumber() {
  return `${
    Math.floor(Math.random() * (10 - 0) + 0).toString() +
    Math.floor(Math.random() * (10 - 0) + 0).toString() +
    Math.floor(Math.random() * (10 - 0) + 0).toString() +
    Math.floor(Math.random() * (10 - 0) + 0).toString() +
    Math.floor(Math.random() * (10 - 0) + 0).toString()
  }`;
}
const chars = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'yo',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'c',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ъ: '',
  ы: 'y',
  ь: '',
  э: 'e',
  ю: 'yu',
  я: 'ya',
  А: 'a',
  Б: 'b',
  В: 'v',
  Г: 'g',
  Д: 'd',
  Е: 'e',
  Ё: 'yo',
  Ж: 'zh',
  З: 'z',
  И: 'i',
  Й: 'y',
  К: 'k',
  Л: 'l',
  М: 'm',
  Н: 'n',
  О: 'o',
  П: 'p',
  Р: 'r',
  С: 's',
  Т: 't',
  У: 'u',
  Ф: 'f',
  Х: 'h',
  Ц: 'c',
  Ч: 'ch',
  Ш: 'sh',
  Щ: 'shch',
  Ъ: '',
  Ы: 'y',
  Ь: '',
  Э: 'e',
  Ю: 'yu',
  Я: 'ya',
};

function generateLogin(surname, name, lastname) {
  let newSurname = surname
    .split('')
    .map(item => chars[item])
    .join('');
  let newName = chars[name[0]];
  let newLastName = chars[lastname[0]];
  return !!newSurname && !!newLastName && !!newName
    ? `${newSurname}_${newName + newLastName}`
    : false;
}

const UserCreation = ({
  addCreation,
  match,
  loadJudicialSectors,
  loadUser,
  listJudicialSectors,
  cleanState,
  creationUserState,
  loadListRoles,
  editUser,
  history,
}: IUserCreation) => {
  let { id } = match.params;

  // Нужен чтобы данные при изменении пользователя загружались только 1 раз
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(!id);
  const prevValues = creationUserState.createdUser;
  useEffect(() => {
    loadJudicialSectors(false);
  }, [loadJudicialSectors]);

  useEffect(() => {
    loadListRoles();
  }, [loadListRoles]);

  useEffect(() => {
    if (!isUserDataLoaded && prevValues) {
      setIsUserDataLoaded(true);
      formik.setValues({
        ...formik.values,
        user_id: prevValues.user_id,
        surname: prevValues.surname,
        lastname: prevValues.lastname,
        name: prevValues.name,
        username: prevValues.username,
        position: prevValues.position,
        role_id: prevValues.role_id.toString(),
        area_id: prevValues.area_id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevValues]);

  useEffect(() => {
    if (id !== undefined) loadUser(id);
  }, [loadUser, id]);

  useEffect(() => {
    return () => {
      cleanState();
    };
  }, [cleanState]);

  const formik = useFormik({
    initialValues: {
      ...prevValues,
      user_id: '',
      surname: '',
      name: '',
      lastname: '',
      username: `user${randomNumber()}`,
      position: '',
      role_id: '2',
      password: '',
      area_id: prevValues?.area_id || [],
    },

    onSubmit: values => {
      if (id === undefined) {
        const newUser: AddUser = {
          ...values,
          role_id: parseInt(values.role_id),
        };
        delete newUser.user_id;
        addCreation(newUser, history);
      } else {
        editUser({ ...values, user_id: id }, history);
      }
    },
  });

  useEffect(() => {
    if (
      !!formik.values.surname &&
      !!formik.values.name &&
      !!formik.values.lastname &&
      !formik.values.user_id
    ) {
      const newLogin: string | false = generateLogin(
        formik.values.lastname,
        formik.values.name,
        formik.values.surname,
      );
      if (newLogin !== false) {
        formik.setValues({
          ...formik.values,
          username: newLogin,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.name, formik.values.lastname, formik.values.surname]);

  const passwordGenerate = () => {
    const pwd = generator.generate({
      length: 8,
      numbers: true,
    });
    formik.setValues({
      ...formik.values,
      password: pwd,
    });
  };

  const pathUserList = () => {
    let path = AUTH_PROTECTED_ROUTES.USERS_LIST.pathTransition;
    return path;
  };

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle className='cart__title'>
            <Row className='row justify-content-between'>
              <span>Введите данные о пользователе</span>
              <Link className='btn close' to={pathUserList}>
                <span>×</span>
              </Link>
            </Row>
          </CardTitle>

          <Formik initialValues={formik.initialValues} onSubmit={() => {}}>
            <AvForm
              onValidSubmit={formik.handleSubmit}
              model={formik.initialValues}
            >
              <FormGroup className='mb-4' row>
                <Label htmlFor='billing-name' md='2' className='col-form-label'>
                  Фамилия
                </Label>
                <Col md='10'>
                  <AvField
                    required
                    className='form-control form-control'
                    placeholder='Введите фамилию'
                    errorMessage='Необходимо заполнить поле'
                    name='lastname'
                    onChange={formik.handleChange}
                    value={formik.values.lastname}
                  />
                </Col>
              </FormGroup>
              <FormGroup className='mb-4' row>
                <Label htmlFor='billing-name' md='2' className='col-form-label'>
                  Имя
                </Label>
                <Col md='10'>
                  <AvField
                    required
                    type='text'
                    className='form-control form-control'
                    placeholder='Введите имя'
                    errorMessage='Необходимо заполнить поле'
                    name='name'
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </Col>
              </FormGroup>
              <FormGroup className='mb-4' row>
                <Label htmlFor='billing-name' md='2' className='col-form-label'>
                  Отчество
                </Label>
                <Col md='10'>
                  <AvField
                    required
                    type='text'
                    className='form-control form-control'
                    placeholder='Введите отчество'
                    errorMessage='Необходимо заполнить поле'
                    name='surname'
                    onChange={formik.handleChange}
                    value={formik.values.surname}
                  />
                </Col>
              </FormGroup>
              <FormGroup className='mb-4' row>
                <Label htmlFor='billing-name' md='2' className='col-form-label'>
                  Логин
                </Label>
                <Col md='10'>
                  <AvField
                    required
                    type='text'
                    className='form-control form-control'
                    errorMessage='Некорректно заполнено поле'
                    name='username'
                    validate={{
                      pattern: {
                        value: /^[0-9a-zA-Z-_!@#()-_.]*$/,
                        errorMessage:
                          'Некорректно заполнен логин (Логин может содержать английские буквы и цифры)',
                      },
                    }}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    title='Только английские буквы и цифры'
                  />
                </Col>
              </FormGroup>
              <FormGroup className='mb-4' row>
                <Label htmlFor='billing-name' md='2' className='col-form-label'>
                  Должность
                </Label>
                <Col md='10'>
                  <AvField
                    required
                    type='text'
                    className='form-control form-control'
                    placeholder='Введите должность'
                    errorMessage='Необходимо заполнить поле'
                    name='position'
                    onChange={formik.handleChange}
                    value={formik.values.position}
                  />
                </Col>
              </FormGroup>
              <FormGroup className='mb-4' row>
                <Label htmlFor='billing-name' md='2' className='col-form-label'>
                  Доступные судебные участки
                </Label>
                <Col md='3' className='courtsectors-form-col-modal-wrapper'>
                  <FormCourtSectors
                    areas={formik.values.area_id}
                    handleChange={formik.handleChange}
                    listJudicialSectors={listJudicialSectors}
                  />
                </Col>
              </FormGroup>
              <FormGroup className='mb-4' row>
                <Label htmlFor='billing-name' md='2' className='col-form-label'>
                  Роль пользователя
                </Label>
                <Col md='10'>
                  <AvField
                    required
                    type='select'
                    className='form-control form-select'
                    errorMessage='Необходимо заполнить поле'
                    id='billing-name'
                    name='role_id'
                    onChange={formik.handleChange}
                    value={formik.values.role_id.toString()}
                  >
                    {creationUserState.listRoles?.map(role => (
                      <option key={role.role_id} value={role.role_id}>
                        {role.name}
                      </option>
                    ))}
                  </AvField>
                </Col>
              </FormGroup>
              <FormGroup className='mb-4' row>
                <Label htmlFor='billing-name' md='2' className='col-form-label'>
                  Пароль
                </Label>
                <Col md='10'>
                  <div className='form__col-password'>
                    <AvField
                      required={formik.values.user_id ? false : true}
                      type='text'
                      className='form-control'
                      placeholder='Введите пароль'
                      errorMessage='Необходимо заполнить поле'
                      name='password'
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <div>
                      <Button
                        className='form__btn-password'
                        color='primary'
                        outline
                        onClick={passwordGenerate}
                      >
                        Сгенерировать пароль
                      </Button>
                    </div>
                  </div>
                </Col>
              </FormGroup>
              {creationUserState.response ? (
                creationUserState.response.code === 200 ? (
                  <Alert color='success'>
                    {creationUserState.response.message}
                  </Alert>
                ) : !creationUserState.response.message ? (
                  <Alert color='danger'>Неизвестная ошибка</Alert>
                ) : (
                  <Alert color='danger'>
                    {creationUserState.response.message}
                  </Alert>
                )
              ) : null}
              <div className='form-group-btn'>
                <Link className='btn btn-secondary' to={pathUserList}>
                  Отмена
                </Link>
                <Button
                  className='form-group-btn__btn-save'
                  type='submit'
                  color='primary'
                >
                  Сохранить
                </Button>
              </div>
            </AvForm>
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};
const mapStateToProps = (state: RootState) => {
  const creationUserState = state.UserCreation;
  const { listJudicialSectors } = state.JudicialSectors;
  return { creationUserState, listJudicialSectors, state };
};

export default connect(mapStateToProps, {
  userCreation,
  addCreation,
  editUser,
  loadUser,
  cleanState,
  loadJudicialSectors,
  loadListRoles,
})(withRouter(UserCreation));
