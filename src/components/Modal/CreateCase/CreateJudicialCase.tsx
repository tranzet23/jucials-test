import React, {useEffect, useRef} from 'react';
import {Button, Col, FormGroup, Input, Label, Modal, ModalBody} from 'reactstrap';
import {IPropsCreateCase} from "./CreateCaseTypes";
import './CreacteCase.scss';
import {Form, Formik} from 'formik';
import FormField from "../../FormField/FormField";
import {IJudicialCasesItemAdd} from "../../../store/judicialCases/types";
import {connect} from "react-redux";
import {addJudicialCases} from "../../../store/judicialCases/actions";


const CreateJudicialCase = ({isOpen, closeModal, actionModal, addJudicialCases}: IPropsCreateCase) => {


    const initialValues: IJudicialCasesItemAdd = {
        case_id: '',
        uid: '',
        plaintiff: {
            birthday: '',
            lastname: '',
            name: '',
            surname: '',
            phone: '',
            reg_address: '',
            res_address: '',
            type: 0,
        },
        defendant: {
            inn: '',
            ogrn: '',
            company: '',
            legal_address: '',
            mailing_address: '',
            kpp: '',
            pc: '',
            bank: '',
            bic: '',
            kc: '',
            type: 1
        },
        start: '',
        end: '',
        area_id: 12,
    };


    return (
        <Modal
            centered
            isOpen={isOpen}
            toggle={closeModal}
            className='modal-createCase'
        >
            <div onClick={closeModal} className='modal-closebtn'>
                <i className='fas fa-times'/>
            </div>
            <ModalBody className='d-flex align-items-center flex-column createCaseBody'>
                <div className='modal-createCase-head'>
                    <p className='font-size-24'>Создать дело</p>
                </div>


                <Formik
                    initialValues={initialValues}

                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        setSubmitting(false);
                        addJudicialCases(values);
                        resetForm({})
                        closeModal();

                    }}
                >
                    {({values, handleSubmit, setFieldValue}) => (

                        <Form onSubmit={handleSubmit} className='createCaseForm'>
                            <div className='head__modal-column'>
                                <div className='flex-column p-0'>
                                    <FormField label={'uid'} value={''} isOpen/>
                                    <FormField label={'case_id'} value={''} isOpen/>
                                </div>
                                <div className='p-0'>
                                    <FormField label={'start'} value={''} typeInput={'date'} bold/>
                                </div>
                            </div>

                            <div className='d-flex head__modal-column'>
                                <div className='flex-column'>
                                    <FormField label={'type'} value={''} isOpen typeInput={'checkbox'}
                                               checkboxLabel={'Юридическое лицо'} bold nesting='plaintiff'/>
                                    <FormField label={'lastname'} value={''} isOpen nesting='plaintiff'/>
                                    <FormField label={'name'} value={''} isOpen nesting='plaintiff'/>
                                    <FormField label={'surname'} value={''} isOpen nesting='plaintiff'/>
                                    <FormField label={'birthday'} value={''} typeInput='date' nesting='plaintiff'/>
                                    <FormField label={'reg_address'} value={''} isOpen nesting='plaintiff'/>
                                    <FormField label={'res_address'} value={''} isOpen nesting='plaintiff'/>
                                    <FormField label={'phone'} value={''} typeInput={'number'} nesting='plaintiff'/>
                                </div>

                                <div className='flex-column'>
                                    <FormField label={'type'} value={''} typeInput={'checkbox'}
                                               checkboxLabel={'Юридическое лицо'} bold nesting='defendant'/>
                                    <FormField label={'inn'} value={''} isOpen nesting='defendant'/>
                                    <FormField label={'ogrn'} value={''} isOpen nesting='defendant'/>
                                    <FormField label={'company'} value={''} isOpen nesting='defendant'/>
                                    <FormField label={'legal_address'} value={''} isOpen nesting='defendant'/>
                                    <Col className='d-flex flex-row-reverse'
                                         onClick={(e) => {
                                             setFieldValue('defendant.mailing_address', e.target.checked ? values.defendant.legal_address : '');
                                         }}
                                    >
                                        <FormGroup className='label d-flex align-items-center createCaseBody__checkbox'>
                                            <Input
                                                type='checkbox'
                                                className='me-2'
                                                id='mailing_address__checkbox'
                                            />
                                            <Label htmlFor='mailing_address__checkbox' className='mb-0'>
                                                Почтовый адрес совпадает с юридическим
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <FormField label={'mailing_address'} value={''} isOpen nesting='defendant'/>
                                    <FormField label={'kpp'} value={''} isOpen nesting='defendant'/>
                                    <FormField label={'pc'} value={''} isOpen nesting='defendant'/>
                                    <FormField label={'bank'} value={''} isOpen nesting='defendant'/>
                                    <FormField label={'bic'} value={''} isOpen nesting='defendant'/>
                                    <FormField label={'kc'} value={''} isOpen nesting='defendant'/>
                                </div>
                            </div>

                            <div className='modal-right-buttons mb-5'>
                                <Button className='w-md mt-1' onClick={closeModal}>
                                    Отмена
                                </Button>
                                <Button className='w-md mt-1' color='primary' onClick={actionModal}>
                                    Создать
                                </Button>

                            </div>
                        </Form>
                    )}
                </Formik>

            </ModalBody>
        </Modal>
    );
};

export default connect(null, {
    addJudicialCases
})(CreateJudicialCase);