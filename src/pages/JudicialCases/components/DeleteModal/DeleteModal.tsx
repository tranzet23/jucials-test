import { Button, Modal } from 'reactstrap';
import { IDeleteModal } from './DeleteModalTypes';
import React from 'react';

export function DeleteModal({
  closeHandler,
  submitHandler,
  currentItem,
  isOpen,
}: IDeleteModal) {
  return (
    <Modal
      className='deleteCasesModal'
      toggle={closeHandler}
      isOpen={isOpen}
      centered
    >
      <div onClick={closeHandler} className='modal-closebtn'>
        <i className='fas fa-times' />
      </div>
      <h2>
        Подтвердите удаление дела <br />
        {currentItem?.case_id}
      </h2>

      <p>Будут удалены судебные заседания, аудиозаписи и все документы</p>

      <div className='modal-center-buttons'>
        <Button
          color='primary'
          onClick={() => {
            submitHandler(currentItem.id);
            closeHandler();
          }}
        >
          Ок
        </Button>
        <Button onClick={closeHandler}>Отменить</Button>
      </div>
    </Modal>
  );
}
