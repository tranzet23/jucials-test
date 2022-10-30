import { connect } from 'react-redux';
import { RootState } from 'store/reducers';
import { getIconUser } from 'utils/app_helper';
import { ProfileMenu, ProfileMenuItem, SwitcherFullscreen } from 'components';
import { ITEMS_PROFILE_MENU, LEFT_TEXT } from './HeaderParamsConstatnst';
import { IHeaderParamsProps } from './HeaderParamsTypes';

function tToggle() {
  var body = document.body;
  if (window.screen.width <= 998) {
    body.classList.toggle('sidebar-enable');
  } else {
    body.classList.toggle('vertical-collpsed');
    body.classList.toggle('sidebar-enable');
  }
}

export const HeaderParams = ({
  username,
  position,
  areaId,
  areaAddress,
  roleId,
}: IHeaderParamsProps) => {
  return (
    <div className='navbar-header'>
      <div className='header-item'>
        <button
          type='button'
          onClick={() => {
            tToggle();
          }}
          className='btn btn-sm px-3 font-size-16 header-item '
          id='vertical-menu-btn'
        >
          <i className='fa fa-fw fa-bars' />
        </button>

        <div className=' ms-2 me-1'>
          <p className='text-start my-0'>
            {LEFT_TEXT} {areaId}
          </p>
          <p className='text-muted my-0'>{areaAddress}</p>
        </div>
      </div>
      <div className='d-flex'>
        <ProfileMenu
          username={username}
          position={position}
          icon={getIconUser(roleId)}
        >
          {ITEMS_PROFILE_MENU.map((item, i: number) => (
            <ProfileMenuItem key={`profile-item-${i}`} {...item} />
          ))}
        </ProfileMenu>
        <SwitcherFullscreen />
      </div>
    </div>
  );
};

const mapStatetoProps = (state: RootState) => {
  const { username, position, areaId, areaAddress, roleId } = state.Profile;
  return {
    username,
    position,
    areaId,
    areaAddress,
    roleId,
  };
};

export default connect(mapStatetoProps, {})(HeaderParams);
