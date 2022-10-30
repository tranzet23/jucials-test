import React from 'react';
import { withRouter } from 'react-router-dom';
import { INonAuthLayout } from './NonAuthLayoutTypes';

const NonAuthLayout = (props: INonAuthLayout) => {
  return <>{props.children}</>;
};

export default withRouter(NonAuthLayout);
