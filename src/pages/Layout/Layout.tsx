import { useEffect } from 'react';
import { Container } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from 'store/reducers';
import { changeTheme } from 'store/actions';
import { HeaderParams, SidebarContent, ActionStatusMessage } from 'modules';
import { Header, Footer, Sidebar, Preloader } from 'components';
import { DATA_COMPANY } from './LayoutConstants';
import { IPropsLayout } from './LayoutTypes';

const Layout = (props: IPropsLayout) => {
  const { displayTheme, isPreloader, changeTheme } = props;

  useEffect(() => {
    if (displayTheme) {
      changeTheme(displayTheme);
    }
  }, [displayTheme, changeTheme]);

  return (
    <>
      {isPreloader && <Preloader />}
      <div id='layout-wrapper'>
        <Header>
          <HeaderParams />
        </Header>

        <Sidebar>
          <SidebarContent />
        </Sidebar>
        <div className='main-content'>
          <div className='page-content'>
            <Container fluid>{props.children}</Container>
            <ActionStatusMessage />
          </div>
        </div>
        <Footer
          companyName={DATA_COMPANY.companyName}
          tagline={DATA_COMPANY.tagline}
        />
      </div>
    </>
  );
};

const mapStatetoProps = (state: RootState) => {
  const { displayTheme, isPreloader } = state.Layout;
  return { displayTheme, isPreloader };
};

export default connect(mapStatetoProps, { changeTheme })(withRouter(Layout));
