import { RouteComponentProps } from 'react-router-dom';

export interface IAuthentication extends RouteComponentProps {
  error: string | null;
  loginUser: (
    userData: { user: string; pass: string },
    history: RouteComponentProps['history'],
  ) => {};
}
