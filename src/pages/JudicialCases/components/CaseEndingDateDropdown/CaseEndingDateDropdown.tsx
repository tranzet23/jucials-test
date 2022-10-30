import React from 'react';
import 'flatpickr/dist/themes/light.css';
import { connect } from 'react-redux';
import { ICaseEndingDateDropdown } from './CaseEndingDateDropdownTypes';

function CaseEndingDateDropdown({
  currentItem,
  areaId,
}: ICaseEndingDateDropdown) {
  return currentItem.end?.length ? (
    <div className='text-center'>{currentItem.end}</div>
  ) : (
    <div className='d-flex justify-content-center align-items-stretch gap-2'>
      &mdash;
    </div>
  );
}

const mapStateToProps = state => {
  const { areaId } = state.Profile;
  return { areaId };
};

export default connect(mapStateToProps, {})(CaseEndingDateDropdown);
