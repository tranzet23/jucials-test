import { Label, Modal, Button } from 'reactstrap';
import { Formik, Field, Form } from 'formik';
import React from 'react';

export default function EditBlockModal({
  isTemplateEditModalOpen,
  setIsTemplateEditModalOpen,
}) {
  function closeModal() {
    setIsTemplateEditModalOpen(false);
  }

  return (
    <Modal
      centered
      isOpen={isTemplateEditModalOpen}
      toggle={closeModal}
      className='modal__file-save'
    >
      <div className='modal-closebtn' onClick={closeModal}>
        <i className='fas fa-times' />
      </div>
      <div>
        <h3 className='modal__heading'>Создать шаблон блока</h3>
        <Formik
          initialValues={{
            docName: '',
          }}
          onSubmit={values => {
            closeModal();
          }}
        >
          {() => (
            <Form>
              <Label className='name-label'>Название шаблона:</Label>
              <Field id='docName' name='docName' className='form-control' />
              <div className='modal__buttons'>
                <Button type='submit' color='primary'>
                  Создать
                </Button>
                <Button type='button' onClick={closeModal} color='secondary'>
                  Отменить
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}
