import { RouteComponentProps } from 'react-router-dom';

export interface IProfileMenuProps extends RouteComponentProps {
  username: string;
  icon: any;
  position: string;
  children: JSX.Element[];
}
