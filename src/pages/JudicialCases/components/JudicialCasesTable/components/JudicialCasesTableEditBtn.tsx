import React from 'react';
import { connect } from 'react-redux';

import editImg from 'assets/images/courtCases/edit.svg';

const JudicialСasesTableEditBtn = () => {
  return (
    <>
      <div
        className='courtcases-table-editbtn-wrapp p-2'
        style={{ cursor: 'pointer' }}
      >
        <img src={editImg} alt='Редактировать' />
      </div>
    </>
  );
};

const mapStateToProps = state => {
  const { areaId } = state.Profile;
  return { areaId };
};

export default connect(mapStateToProps, {})(JudicialСasesTableEditBtn);
