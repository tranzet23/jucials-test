import React from 'react';
import { connect } from 'react-redux';
import { IDeleteModal } from './DeleteModalTypes';
import { Modal, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { RootState } from 'store/reducers';
import { updateModeHearing, deleteJudicialHearing } from 'store/actions';
import {
  getCaseInfo,
  getHearingId,
  selectedHearingNumber,
} from 'store/selectors';

const DeleteModalHearing = ({
  selectedHearingId,
  selectedHearingNumber,
  modeHearing,
  caseInfo,
  updateModeHearing,
  deleteJudicialHearing,
}: IDeleteModal) => {
  const onModeChange = () => {
    updateModeHearing('none');
  };

  const onButtonClick = (hearingId: string) => {
    return () => {
      deleteJudicialHearing(hearingId);
      onModeChange();
    };
  };

  return (
    <Modal
      className='deleteCasesModal'
      toggle={onModeChange}
      isOpen={modeHearing === 'delete'}
      centered
    >
      <div onClick={onModeChange} className='modal-closebtn'>
        <i className='fas fa-times' />
      </div>
      <h2>
        Подтвердите удаление заседания №{selectedHearingNumber} по делу <br />
        {caseInfo?.case_id}
      </h2>

      <p>Будут удалены судебные заседания, аудиозаписи и все документы</p>

      <div className='modal-center-buttons'>
        <Button color='primary' onClick={onButtonClick(selectedHearingId)}>
          Ок
        </Button>
        <Button onClick={onModeChange}>Отменить</Button>
      </div>
    </Modal>
  );
};

const mapStatetoProps = (state: RootState) => {
  const { modeHearing } = state.JudicialHearing;

  return {
    modeHearing,
    caseInfo: getCaseInfo(state),
    selectedHearingId: getHearingId(state),
    selectedHearingNumber: selectedHearingNumber(state),
  };
};

export default connect(mapStatetoProps, {
  updateModeHearing,
  deleteJudicialHearing,
})(withRouter(DeleteModalHearing));
