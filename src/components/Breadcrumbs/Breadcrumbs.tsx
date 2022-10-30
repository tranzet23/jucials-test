import React from 'react';

import { Link } from 'react-router-dom';
import { Row, Col, BreadcrumbItem } from 'reactstrap';
import { IBreadcrumbProps } from './BreadcrumbsTypes';

const Breadcrumbs = (props: IBreadcrumbProps) => {
  return (
    <Row>
      <Col xs='12'>
        <div className='page-title-box d-sm-flex align-items-center justify-content-between'>
          <h4 className='mb-0 font-size-18'>{props.title}</h4>
          <div className='page-title-right'>
            <ol className='breadcrumb m-0'>
              <BreadcrumbItem>
                <Link to='#'>{props.breadcrumbItems[0]}</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active className='text-muted'>
                <Link to='#' className='text-secondary'>
                  {props.breadcrumbItems[1]}
                </Link>
              </BreadcrumbItem>
            </ol>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Breadcrumbs;
