import React from 'react';
import { Link } from 'react-router-dom';
import { IMenuItemProps } from './MenuItemTypes';

const MenuItem = (props: IMenuItemProps) => {
  const { title, subItems } = props;

  return (
    <ul className='metismenu list-unstyled' id='side-menu'>
      <li className='menu-title'>{title}</li>
      <li>
        {subItems.map((route, i) => (
          <Link key={`link_${route.path}_${i}`} to={route.path} className=''>
            <i className={`bx ${route.icon}`}></i>
            <span>{route.name}</span>
          </Link>
        ))}
      </li>
    </ul>
  );
};

export default MenuItem;
