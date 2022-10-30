import React from 'react';
import { Link } from 'react-router-dom';
import { AUTH_PROTECTED_ROUTES } from 'navigation/index';
import logo from 'assets/images/logo.svg';
import logoLightSvg from 'assets/images/logo-light.svg';
import { ISidebarProps } from './SidebarTypes';

const Sidebar = (props: ISidebarProps) => {
  return (
    <>
      <div className='vertical-menu'>
        <div className='navbar-brand-box'>
          <Link
            to={`${AUTH_PROTECTED_ROUTES.DEFAULT.pathTransition}`}
            className='logo logo-dark'
          >
            <span className='logo-sm'>
              <img src={logo} alt='' height='22' />
            </span>
            <span className='logo-lg'>
              <img src={logoLightSvg} alt='' height='17' />
            </span>
          </Link>

          <Link
            to={`${AUTH_PROTECTED_ROUTES.DEFAULT.pathTransition}`}
            className='logo logo-light'
          >
            <span className='logo-lg'>
              <img src={logoLightSvg} alt='' height='50' />
            </span>
          </Link>
        </div>
        <div data-simplebar className='h-100'>
          {props.children}
        </div>
        <div className='sidebar-background'></div>
      </div>
    </>
  );
};
export default Sidebar;
