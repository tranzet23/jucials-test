import { RouteComponentProps } from 'react-router-dom';

export interface IPropsLayout extends RouteComponentProps {
  displayTheme: string;
  isPreloader: boolean;
  changeTheme: (theme: string) => {};
  children: JSX.Element;
}
