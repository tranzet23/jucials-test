import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from 'reactstrap';
import classnames from 'classnames';
import { FormInfoHearing, TransitPanel, WorkOverСhannels } from './components';
import { TABS } from './AudioProcessingConstans';
import { IAudioProcessingProps } from './AudioProcessingTypes';

const AudioProcessing = ({
  children,
  isPlayerReady,
  soundFileStatus,
}: IAudioProcessingProps) => {
  const [audioProcessingCustomActiveTab, setAudioProcessingCustomActiveTab] =
    useState(0);

  const onTabClick = (tabNumber: number) => {
    return () => {
      if (audioProcessingCustomActiveTab !== tabNumber) {
        setAudioProcessingCustomActiveTab(tabNumber);
        onChangeStyleSelectedTab(tabNumber);
      }
    };
  };

  const onChangeStyleSelectedTab = (tabNumber: number) => {
    const panelInformation: any = document.getElementById(
      'panel_information_meeting',
    );

    if (tabNumber === 1) {
      if (panelInformation) {
        panelInformation.style.visibility = 'visible';
      }
    } else {
      if (panelInformation) {
        panelInformation.style.visibility = 'hidden';
      }
    }
  };

  return (
    <>
      <Card>
        <CardBody>
          <Nav tabs className='nav-tabs-custom align-items-end'>
            {TABS.map((tabName, item) => (
              <NavItem key={`navItem_${tabName}`}>
                <NavLink
                  style={{ cursor: 'pointer' }}
                  className={classnames({
                    active: audioProcessingCustomActiveTab === item,
                  })}
                  onClick={onTabClick(item)}
                  disabled={
                    item !== 0 &&
                    !isPlayerReady &&
                    soundFileStatus !== 'needLoad'
                  }
                >
                  <span className='d-block d-sm-none'>
                    <i className='fas fa-home' />
                  </span>
                  <span className='d-none d-sm-block'>{tabName}</span>
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </CardBody>
      </Card>
      <TabContent
        activeTab={audioProcessingCustomActiveTab}
        className='text-muted'
      >
        <TabPane tabId={0}>
          <TransitPanel>{children}</TransitPanel>
        </TabPane>
        <TabPane tabId={1}>
          <div id='panel_information_meeting'>
            <FormInfoHearing />
          </div>
        </TabPane>
        <TabPane tabId={2}>
          <WorkOverСhannels />
        </TabPane>
      </TabContent>
    </>
  );
};

export default AudioProcessing;
