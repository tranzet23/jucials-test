import { Label, Modal, Button } from 'reactstrap';
import { Formik, Field, Form } from 'formik';
import React from 'react';

export default function SaveModalDoc({
  caseAndHearingData,
  selectedDoc,
  getFileName,
  isSaveModalOpen,
  setIsSaveModalOpen,
  saveFile,
}) {
  function closeModal() {
    setIsSaveModalOpen(false);
  }
  return (
    <Modal
      centered
      isOpen={isSaveModalOpen}
      toggle={closeModal}
      className='modal__file-save'
    >
      <div className='modal-closebtn' onClick={closeModal}>
        <i className='fas fa-times' />
      </div>
      <div>
        <h3 className='modal__heading'>
          Сохранить {selectedDoc?.toLowerCase()}
          заседания от {caseAndHearingData?.date} по делу{' '}
          {caseAndHearingData?.case_id}?
        </h3>
        <Formik
          initialValues={{
            docName: getFileName(),
          }}
          onSubmit={values => {
            saveFile(values.docName);
            closeModal();
          }}
        >
          {() => (
            <Form>
              <Label className='name-label'>Название документа:</Label>
              <Field id='docName' name='docName' className='form-control' />
              <div className='modal__buttons'>
                <Button type='submit' color='primary'>
                  Ок
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
