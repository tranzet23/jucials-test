import { RouteComponentProps } from 'react-router-dom';

export interface INonAuthLayout extends RouteComponentProps {
  children: JSX.Element;
}
