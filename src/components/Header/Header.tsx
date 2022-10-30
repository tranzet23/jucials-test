import React from 'react';
import { IHeaderProps } from './HeaderTypes';
import 'react-drawer/lib/react-drawer.css';

export const Header = (props: IHeaderProps) => {
  return (
    <React.Fragment>
      <header id='page-topbar'>{props.children}</header>
    </React.Fragment>
  );
};
export default Header;
