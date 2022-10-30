import { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'store/reducers';
import SimpleBar from 'simplebar-react';
import MetisMenu from 'metismenujs';
import { withRouter } from 'react-router-dom';
import { authProtectedRoutes } from 'navigation';
import { getTitleSidebarManu, getItemsMenu } from 'utils/app_helper';
import { MenuItem } from 'components';
import { ISidebarContentProps } from './SidebarContentTypes';

function activateParentDropdown(item: HTMLElement) {
  item.classList.add('active');
  const parent = item.parentElement;
  if (parent === null) return false;
  const parent2El = parent.childNodes[1] as HTMLElement;
  if (parent2El && parent2El.id !== 'side-menu') {
    parent2El.classList.add('mm-show');
  }

  if (parent) {
    parent.classList.add('mm-active');
    const parent2 = parent.parentElement;

    if (parent2) {
      parent2.classList.add('mm-show'); // ul tag

      const parent3 = parent2.parentElement as any; // li tag

      if (parent3) {
        parent3.classList.add('mm-active'); // li
        parent3.childNodes[0].classList.add('mm-active'); //a
        const parent4 = parent3.parentElement; // ul
        if (parent4) {
          parent4.classList.add('mm-show'); // ul
          const parent5 = parent4.parentElement;
          if (parent5) {
            parent5.classList.add('mm-show'); // li
            parent5.childNodes[0].classList.add('mm-active'); // a tag
          }
        }
      }
    }
  }
}

const SidebarContent = (props: ISidebarContentProps) => {
  const { pages } = props;

  useEffect(() => {
    let pathName = props.location.pathname;
    pathName = pathName.split('/')[1];

    const initMenu = () => {
      new MetisMenu('#side-menu');
      let matchingMenuItem: HTMLElement | null = null;
      const ul = document.getElementById('sidebar-menu') as HTMLElement;
      const items = ul.getElementsByTagName('a');
      for (let i = 0; i < items.length; ++i) {
        if (!pathName || !items[i].pathname) continue;
        // Проверяем только путь перед 1 слэшем
        let menuItem = items[i].pathname.split('/')[1];
        if (pathName === menuItem) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    if (pages && pages.length > 0) {
      initMenu();
    }
  }, [props.location.pathname, pages]);

  return (
    <>
      <SimpleBar className='h-100'>
        <div id='sidebar-menu'>
          {getItemsMenu(pages).map(itemsMenu => (
            <MenuItem
              key={itemsMenu}
              title={getTitleSidebarManu(itemsMenu)}
              subItems={authProtectedRoutes.filter(
                item =>
                  item.userType === itemsMenu &&
                  pages.findIndex(page => page === item.id) > -1,
              )}
            />
          ))}
        </div>
      </SimpleBar>
    </>
  );
};

const mapStatetoProps = (state: RootState) => {
  const { pages } = state.Profile;
  return { pages };
};

export default connect(mapStatetoProps, {})(withRouter(SidebarContent));
