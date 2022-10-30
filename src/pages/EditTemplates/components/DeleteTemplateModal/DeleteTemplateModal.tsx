import { Button, Modal } from 'reactstrap';
import React from 'react';
import { IDeleteTemplateModalTypes } from './DeleteTemplateModalTypes';
import { withRouter } from 'react-router-dom';

export function DeleteTemplateModal({
  condition,
  setIsModalOpen,
  itemName,
  itemId,
  isBlock,
  history,
  deleteHandler,
  setSelectedItem,
  isTemplateExists,
  setTemplateBlocks,
  setItem,
  isTemplate,
}: IDeleteTemplateModalTypes) {
  function closeHandler() {
    setIsModalOpen(false);
  }
  function deleteItem() {
    if (!isTemplateExists) {
      setTemplateBlocks((prevState: any[]) => {
        return prevState.filter(item => {
          return item.template_id !== itemId;
        });
      });
      return closeHandler();
    }
    if (!isBlock) {
      setItem(null);
      setSelectedItem(null);
      return deleteHandler(itemId!);
    }
    deleteHandler(itemId!);
    closeHandler();
  }

  return (
    <Modal
      className='modal-dialog-narrow'
      toggle={closeHandler}
      isOpen={condition === 'delete'}
      centered
    >
      <div onClick={closeHandler} className='modal-closebtn'>
        <i className='fas fa-times' />
      </div>
      <h2>
        Удалить {!isTemplate ? 'документ' : isBlock ? 'блок' : 'шаблон'}
        <br /> "{itemName}"?
      </h2>
      <div className='modal-center-buttons'>
        <Button color='primary' onClick={deleteItem} className='w-md'>
          Ок
        </Button>
        <Button className='w-md' onClick={closeHandler}>
          Отменить
        </Button>
      </div>
    </Modal>
  );
}

export default withRouter(DeleteTemplateModal);
