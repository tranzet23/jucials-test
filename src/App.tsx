import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { publicRoutes, authProtectedRoutes } from 'navigation';
import { Layout, NonAuthLayout } from 'pages';
import { AuthRouter } from 'components';

import 'assets/scss/theme.scss';

function App() {
  return (
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
            isAuthProtected={false}
            exact
          />
        ))}
      </Switch>
    </Router>
  );
}

export default App;
