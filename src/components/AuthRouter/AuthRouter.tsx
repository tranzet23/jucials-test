import { Route, Redirect } from 'react-router-dom';
import { PUBLIC_ROUTES } from 'navigation/index';

const AuthRouter = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (isAuthProtected && !localStorage.getItem('token')) {
        return (
          <Redirect
            to={{
              pathname: PUBLIC_ROUTES.LOGIN.path,
              state: { from: props.location },
            }}
          />
        );
      }

      return <Layout>{<Component {...props} />}</Layout>;
    }}
  />
);

export default AuthRouter;
