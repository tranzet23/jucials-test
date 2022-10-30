import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { IProfileMenuProps } from './ProfileMenuTypes';

const ProfileMenu = (props: IProfileMenuProps) => {
  const { icon, username, position } = props;
  const [menu, setMenu] = useState(false);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className='d-inline-block'
      >
        <DropdownToggle
          className='btn header-item '
          id='page-header-user-dropdown'
          tag='button'
        >
          {icon && (
            <img
              className='rounded-circle header-profile-user'
              src={icon}
              alt='Header Avatar'
            />
          )}
          <div className='ms-2 me-1'>
            <p className='text-start my-0'>{username}</p>
            <p className='text-muted my-0'>{position}</p>
          </div>

          <i className='mdi mdi-chevron-down d-none d-xl-inline-block' />
        </DropdownToggle>

        <DropdownMenu className='dropdown-menu-end'>
          {props.children}
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default withRouter(ProfileMenu);
