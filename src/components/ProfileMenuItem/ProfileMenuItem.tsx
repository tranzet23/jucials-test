import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { IProfileMenuItemProps } from './ProfileMenuItemTypes';

const ProfileMenuItem = (props: IProfileMenuItemProps) => {
  const { link, text, icon, isDetach, appearance } = props;
  const classItemBase = `bx ${icon} font-size-16 align-middle me-1`;

  return (
    <>
      {isDetach && <div className='dropdown-divider' />}
      <Link to={link} className='dropdown-item'>
        <i
          className={cn(classItemBase, {
            'text-danger': appearance === 'danger',
          })}
        />
        <span>{text}</span>
      </Link>
    </>
  );
};

export default ProfileMenuItem;
