import React from 'react';
import { Button, Modal } from 'reactstrap';

interface IUserRolesDeleteModal {
  active: boolean;
  item: any;
  closeHandler: (condition: boolean, item) => void;
  deleteHandler: (id: number) => void;
}

const UserRolesDeleteModal = ({
  active,
  item,
  closeHandler,
  deleteHandler,
}: IUserRolesDeleteModal) => {
  if (!item) return null;

  const closeModalHandler = () => {
    closeHandler(false, item.id);
  };

  return (
    <Modal
      isOpen={active}
      toggle={closeModalHandler}
      style={{ maxWidth: '450px' }}
      centered
    >
      <div className='userroles-modaldelete-wrapper'>
        <div onClick={closeModalHandler} className='modal-closebtn'>
          <i className='fas fa-times' />
        </div>
        <div className='userroles-modal-delete-text'>
          Удалить роль пользователя {item.name}
        </div>
        <Button
          className='userroles-modal-delete-confirm'
          color='primary'
          onClick={() => deleteHandler(item.id)}
        >
          Ок
        </Button>
        <Button
          className='userroles-modal-delete-cancel'
          color='secondary'
          onClick={closeModalHandler}
        >
          Отменить
        </Button>
      </div>
    </Modal>
  );
};

export default UserRolesDeleteModal;
