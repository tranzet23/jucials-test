import React from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import { IPropsUserDelete } from './UserDeleteTypes';

const UserDelete = ({
  user,
  isOpen,
  closeModal,
  actionModal,
}: IPropsUserDelete) => {
  return (
    <Modal
      centered
      isOpen={isOpen}
      toggle={closeModal}
      className='modal-dialog-narrow'
    >
      <div onClick={closeModal} className='modal-closebtn'>
        <i className='fas fa-times' />
      </div>
      <ModalBody className='d-flex align-items-center flex-column'>
        <div className='font-size-22'>Удалить пользователя</div>
        <div className='font-size-22 mb-3 text-center'>
          {user?.lastname} {user?.name} {user?.surname}?
        </div>
        <div className='user_list_no_avatar user_list_no_avatar_delete_modal mb-4'>
          {user?.name.substring(0, 1)}
        </div>
        <div className='modal-center-buttons'>
          <Button className='w-md my-1' color='primary' onClick={actionModal}>
            Ок
          </Button>
          <Button className='w-md mt-1 mb-5' onClick={closeModal}>
            Отменить
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default UserDelete;
