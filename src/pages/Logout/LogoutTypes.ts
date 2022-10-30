import { RouteComponentProps } from 'react-router-dom';

export interface ILogoutPage extends RouteComponentProps {
  logoutUser: (history: RouteComponentProps['history']) => {};
}
