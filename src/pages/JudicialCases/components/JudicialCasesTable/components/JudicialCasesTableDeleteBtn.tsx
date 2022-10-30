import React, { useState } from 'react';
import { connect } from 'react-redux';
import deleteImg from 'assets/images/courtCases/delete.svg';
import { deleteJudicialCases } from 'store/actions';
import { DeleteModal } from '../../DeleteModal/DeleteModal';

interface JucidialCasesTableEditBtnTypes {
  currentItem: any;
  deleteJudicialCases: (id: number) => void;
}

const JucidialCasesTableDeleteBtn = ({
  currentItem,

  deleteJudicialCases,
}: JucidialCasesTableEditBtnTypes) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const deleteJudicialCasesHandler = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <div
        className='courtcases-table-editbtn-wrapp p-2'
        onClick={deleteJudicialCasesHandler}
        style={{ cursor: 'pointer' }}
      >
        <img src={deleteImg} alt='Редактировать' />
      </div>
      <DeleteModal
        isOpen={isOpenModal}
        closeHandler={() => setIsOpenModal(false)}
        submitHandler={deleteJudicialCases}
        currentItem={currentItem}
      />
    </>
  );
};

export default connect(() => ({}), {
  deleteJudicialCases,
})(JucidialCasesTableDeleteBtn);
