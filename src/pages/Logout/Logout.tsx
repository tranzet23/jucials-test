import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logoutUser } from 'store/actions';
import { ILogoutPage } from './LogoutTypes';

const Logout = ({ logoutUser, history }: ILogoutPage) => {
  useEffect(() => {
    logoutUser(history);
  }, [logoutUser, history]);

  return <></>;
};
const mapStatetoProps = () => {
  return {};
};
export default connect(mapStatetoProps, { logoutUser })(withRouter(Logout));
