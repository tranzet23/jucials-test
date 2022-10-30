import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import { RootState } from 'store/reducers';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { publicRoutes, authProtectedRoutes } from 'navigation';
import { getProfileData } from 'store/actions';
import { Layout, NonAuthLayout } from 'pages';
import { AuthRouter } from 'components';
import { IAppProps } from './AppTypes';

import 'assets/scss/theme.scss';

const App = ({ getProfileData }: IAppProps) => {
  useEffect(() => {
    getProfileData();
  }, [getProfileData]);

  return (
    <>
      <Router>
        <Switch>
          {publicRoutes.map((route, idx) => (
            <AuthRouter
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}

          {authProtectedRoutes.map((route, idx) => (
            <AuthRouter
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
        </Switch>
      </Router>
    </>
  );
};
const mapStateToProps = () => {
  return {};
};
export default connect(mapStateToProps, { getProfileData })(App);
