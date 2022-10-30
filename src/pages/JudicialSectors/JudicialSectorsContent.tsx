import React from 'react';
import { CardBody, Button, Modal } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation-safe';
import logoLightSvg from 'assets/images/logo-light.svg';

export const AddJudicialSectorPopupContent = ({
  dispatch,
  popupHandler,
  isOpen,
}) => {
  const formSubmitHandler = (e, v) => {
    e.preventDefault();
    dispatch(v);
    closePopup();
  };
  const closePopup = (e: any = null) => {
    e?.preventDefault();
    return popupHandler(0);
  };
  return (
    <Modal
      className='court-popup-wrapper'
      isOpen={isOpen}
      toggle={closePopup}
      style={{ maxWidth: '500px' }}
      centered
    >
      <div onClick={closePopup} className='modal-closebtn'>
        <i className='fas fa-times' />
      </div>
      <div className='bg-primary bg-soft bg-relative bg__border'>
        <div onClick={() => popupHandler(0)} className='modal-closebtn'>
          <i className='fas fa-times' />
        </div>
        <div className='popup__logo_header'>
          <span className='logo-lg modal-heading'>
            <img src={logoLightSvg} alt='' height='50' />
          </span>
        </div>
        <div className='text-primary pb-4'>
          <h5 className='text-primary  mb-1 court__popup_title'>
            Создать судебный участок
          </h5>
        </div>
      </div>
      <CardBody className='modal-body'>
        <AvForm
          className='form-horizontal'
          onValidSubmit={(e, v) => formSubmitHandler(e, v)}
        >
          <div className='popup__input__wrapper'>
            <label htmlFor='classification_code' className='popup__input_title'>
              Классификационный код
            </label>
            <AvField
              name='classification_code'
              className='popup__input'
              required
              errorMessage='Введите классификационный код'
            />
          </div>
          <div className='popup__input__wrapper'>
            <label htmlFor='address' className='popup__input_title'>
              Район
            </label>
            <AvField
              name='address'
              className='popup__input'
              required
              errorMessage='Введите район'
            />
          </div>
          <div className='popup__input__wrapper'>
            <label htmlFor='district' className='popup__input_title'>
              Адрес
            </label>
            <AvField
              name='district'
              className='popup__input'
              required
              errorMessage='Введите адрес'
            />
          </div>
          <div className='popup__input__wrapper popup__input__wraper_flex'>
            <div className='popup__input_item'>
              <label htmlFor='district_id' className='popup__input_title'>
                Номер участка
              </label>
              <AvField
                name='district_id'
                className='popup__input'
                required
                errorMessage='Введите номер участка'
              />
            </div>
            <div className='popup__input_item'>
              <label htmlFor='judge' className='popup__input_title'>
                Судья
              </label>
              <AvField
                name='judge'
                className='popup__input'
                required
                errorMessage='Заполните поле судья'
              />
            </div>
          </div>

          <div className='modal-buttons-container mt-5'>
            <Button
              onClick={e => closePopup(e)}
              type='button'
              color='secondary'
            >
              Отмена
            </Button>
            <Button type='submit' color='primary'>
              Сохранить
            </Button>
          </div>
        </AvForm>
      </CardBody>
    </Modal>
  );
};

export const EditJudicialSectorPopupContent = ({
  item,
  dispatch,
  popupHandler,
  isOpen,
}) => {
  const formSubmitHandler = (e, v) => {
    e.preventDefault();
    dispatch({ ...v, id: item.id });
    closePopup();
  };
  const closePopup = (e: any = null) => {
    e?.preventDefault();
    return popupHandler(0);
  };
  return (
    <Modal
      className='court-popup-wrapper'
      isOpen={isOpen}
      toggle={popupHandler}
      style={{ maxWidth: '500px' }}
      centered
    >
      <div onClick={popupHandler} className='modal-closebtn'>
        <i className='fas fa-times' />
      </div>
      <div className='bg-primary bg-soft bg-relative bg__border'>
        <div onClick={closePopup} className='modal-closebtn'>
          <i className='fas fa-times' />
        </div>
        <div className='popup__logo_header'>
          <span className='logo-lg modal-heading'>
            <img src={logoLightSvg} alt='' height='50' />
          </span>
        </div>
        <div className='text-primary pb-4'>
          <h5 className='text-primary  mb-1 court__popup_title'>
            Изменить судебный участок
          </h5>
        </div>
      </div>
      <CardBody className='modal-body'>
        <AvForm
          className='form-horizontal'
          onValidSubmit={(e, v) => formSubmitHandler(e, v)}
        >
          <div className='popup__input__wrapper'>
            <label htmlFor='classification_code' className='popup__input_title'>
              Классификационный код
            </label>
            <AvField
              name='classification_code'
              className='popup__input'
              required
              value={item.classification_code}
              errorMessage='Введите классификационный код'
            />
          </div>
          <div className='popup__input__wrapper'>
            <label htmlFor='address' className='popup__input_title'>
              Район
            </label>
            <AvField
              name='address'
              className='popup__input'
              required
              value={item.address}
              errorMessage='Введите район'
            />
          </div>
          <div className='popup__input__wrapper'>
            <label htmlFor='district' className='popup__input_title'>
              Адрес
            </label>
            <AvField
              name='district'
              className='popup__input'
              required
              value={item.district}
              errorMessage='Введите адрес'
            />
          </div>
          <div className='popup__input__wrapper popup__input__wraper_flex'>
            <div className='popup__input_item'>
              <label htmlFor='district_id' className='popup__input_title'>
                Номер участка
              </label>
              <AvField
                name='district_id'
                className='popup__input'
                required
                value={item.district_id}
                errorMessage='Введите номер участка'
              />
            </div>
            <div className='popup__input_item'>
              <label htmlFor='judge' className='popup__input_title'>
                Судья
              </label>
              <AvField
                name='judge'
                className='popup__input'
                required
                value={item.judge}
                errorMessage='Введите судью'
              />
            </div>
          </div>

          <div className='mt-5 modal-buttons-container'>
            <Button color='secondary' onClick={e => closePopup(e)}>
              Отмена
            </Button>
            <Button type='submit' color='primary'>
              Сохранить
            </Button>
          </div>
        </AvForm>
      </CardBody>
    </Modal>
  );
};

export const DeleteJudicialSectorPopupContent = ({
  item,
  dispatch,
  popupHandler,
  isOpen,
}) => {
  const deletePopUpHandlerClose = ({ id }) => {
    dispatch(id);
    popupHandler(0);
  };
  return (
    <Modal
      className='court-popup-wrapper'
      isOpen={isOpen}
      toggle={popupHandler}
      style={{ maxWidth: '450px' }}
      centered
    >
      <div onClick={popupHandler} className='modal-closebtn'>
        <i className='fas fa-times' />
      </div>
      <div className='popup__delete_content'>
        <h3 className='popup__delete_text'>
          Удалить судебный участок № {item.districtId}?
        </h3>
        <div className='popup__delete_img'>{item.districtId}</div>
        <div className='popup__delete_btns modal-center-buttons'>
          <Button color='primary' onClick={() => deletePopUpHandlerClose(item)}>
            Ок
          </Button>
          <Button color='secondary' onClick={() => popupHandler(0)}>
            Отменить
          </Button>
        </div>
      </div>
    </Modal>
  );
};
