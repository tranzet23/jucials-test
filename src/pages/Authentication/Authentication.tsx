import React from 'react';
import { Row, Col, CardBody, Card, Alert, Container } from 'reactstrap';
import { RootState } from 'store/reducers';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { AvForm, AvField } from 'availity-reactstrap-validation-safe';
import { AUTH_PROTECTED_ROUTES } from 'navigation/index';
import logoLightSvg from 'assets/images/logo-light.svg';
import { loginUser } from 'store/actions';
import { ITEMS_FORM, TEXT_IN_HEADER_AUTH } from './AuthenticationConstants';
import { IAuthentication } from './AuthenticationTypes';

const Authentication = ({ loginUser, history, error }: IAuthentication) => {
  const handleValidSubmit = (_, values) => {
    loginUser(values, history);
  };

  return (
    <React.Fragment>
      <div className='home-btn d-none d-sm-block'>
        <Link
          to={`${AUTH_PROTECTED_ROUTES.DEFAULT.pathTransition}`}
          className='text-dark'
        >
          <i className='fas fa-home h2' />
        </Link>
      </div>
      <div className='account-pages my-5 pt-sm-5'>
        <Container>
          <Row className='justify-content-center'>
            <Col md={8} lg={6} xl={5}>
              <Card className='overflow-hidden'>
                <div className='bg-primary bg-soft'>
                  <Row>
                    <div className='auth-logo-header'>
                      <span className='logo-lg px-4 pt-2'>
                        <img src={logoLightSvg} alt='' height='50' />
                      </span>
                    </div>
                    <div className='text-primary px-4 pb-4'>
                      <h5 className='text-primary  mb-1 '>
                        {TEXT_IN_HEADER_AUTH.title}
                      </h5>
                      <h6 className='text-primary sub'>
                        {TEXT_IN_HEADER_AUTH.subtitle}
                      </h6>
                    </div>
                  </Row>
                </div>
                <CardBody className='pt-0'>
                  <div className='p-2'>
                    <AvForm
                      className='form-horizontal'
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v);
                      }}
                    >
                      <div className='mb-3 pt-4'>
                        {error && <Alert color='danger'>{error}</Alert>}
                        <AvField
                          name={ITEMS_FORM.login.name}
                          label={ITEMS_FORM.login.text}
                          className='form-control'
                          placeholder={ITEMS_FORM.login.placeholder}
                          errorMessage={ITEMS_FORM.login.errorMessage}
                          type='text'
                          required
                        />
                      </div>

                      <div className='mb-3  pb-4'>
                        <AvField
                          name={ITEMS_FORM.password.name}
                          label={ITEMS_FORM.password.text}
                          type='password'
                          placeholder={ITEMS_FORM.password.placeholder}
                          errorMessage={ITEMS_FORM.password.errorMessage}
                          autoComplete='on'
                          required
                        />
                      </div>

                      <div className='mt-3 pb-4 d-grid'>
                        <button
                          className='btn btn-primary btn-block'
                          type='submit'
                        >
                          {ITEMS_FORM.buttonLogin.text}
                        </button>
                      </div>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

const mapStatetoProps = (state: RootState) => {
  const { error } = state.Login;
  return { error };
};

export default connect(mapStatetoProps, { loginUser })(
  withRouter(Authentication),
);
