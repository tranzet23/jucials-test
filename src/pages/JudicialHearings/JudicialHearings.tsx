import { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { RootState } from 'store/reducers';
import { getListHearings } from 'store/actions';
import { getCaseNumber } from 'store/selectors';
import { Breadcrumbs } from 'components';
import { TABS_JUDICIAL_HEARINGS } from './JudicialHearingsConstant';
import {
  ControllerHearing,
  PanelHearing,
  PanelInformation,
  FormCreationHearing,
} from './components';
import { IJudicialHearingsProps } from './JudicialHearingsTypes';
import DeleteModal from './components/DeleteModal/DeleteModal';

const JudicialHearings = ({
  getListHearings,
  caseNumber,
}: IJudicialHearingsProps) => {
  const [customActiveTab, setcustomActiveTab] = useState(0);

  useEffect(() => {
    getListHearings();
  }, [getListHearings]);

  const titlePage = `${
    customActiveTab === 0 ? 'Заседания по делу' : 'Дело'
  } №${caseNumber}`;

  const onTabClick = (tabNumber: number) => {
    return () => {
      if (customActiveTab !== tabNumber) {
        setcustomActiveTab(tabNumber);
      }
    };
  };

  return (
    <>
      <Breadcrumbs
        title={titlePage}
        breadcrumbItems={['Дела судебного участка', 'Просмотр']}
      />
      <Row>
        <Col xs='12'>
          <Card>
            <div>
              <FormCreationHearing />
            </div>

            <CardBody>
              <Nav tabs className='nav-tabs-custom align-items-end'>
                {TABS_JUDICIAL_HEARINGS.map((tabName, item) => (
                  <NavItem key={`navItem_${tabName}`}>
                    <NavLink
                      style={{ cursor: 'pointer' }}
                      className={classnames({
                        active: customActiveTab === item,
                      })}
                      onClick={onTabClick(item)}
                    >
                      <span className='d-block d-sm-none'>
                        <i className='fas fa-home' />
                      </span>
                      <span className='d-none d-sm-block'>{tabName}</span>
                    </NavLink>
                  </NavItem>
                ))}
                {customActiveTab === 0 && <ControllerHearing />}
              </Nav>

              <TabContent
                activeTab={customActiveTab}
                className='p-3 text-muted'
              >
                <TabPane tabId={0}>
                  <PanelHearing />
                </TabPane>
                <TabPane tabId={1}>
                  <PanelInformation />
                </TabPane>
              </TabContent>

              <DeleteModal />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

const mapStatetoProps = (state: RootState) => {
  return { caseNumber: getCaseNumber(state) };
};

export default connect(mapStatetoProps, { getListHearings })(
  withRouter(JudicialHearings),
);
