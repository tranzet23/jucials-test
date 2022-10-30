import { RouteComponentProps } from 'react-router-dom';

export interface IAuthRouter extends RouteComponentProps {
  isAuthProtected: boolean;
  component: JSX.Element;
  layout: JSX.Element;
}
