import {Col, FormGroup, Input, Label} from 'reactstrap';
import {Field} from 'formik';
import {IFieldFormProps} from './FormFieldTypes';
import {VALUE_FIELDS_FOR_FORM} from 'constants/app_сonstants';
import React from "react";

const FieldForm = ({
                       label,
                       value,
                       checkboxLabel,
                       typeInput = 'text',
                       bold = false,
                       isOpen = false,
                       nesting = ''
                   }: IFieldFormProps) => {
    return (
        <Col>
            <h6>
                {bold === true
                    ? <strong className='fw-bold'>{nesting !== ''
                        ? VALUE_FIELDS_FOR_FORM[nesting] + ':'
                        :  VALUE_FIELDS_FOR_FORM[label] + ':' }</strong>
                    : <strong className='fw-medium'>{VALUE_FIELDS_FOR_FORM[label]}</strong>
                }
            </h6>


            {typeInput === 'text' && isOpen === false ? (
                value
            ) : (
                <Field name={nesting ? nesting + '.' + label : label}>
                    {({field}) => (
                        <div>{
                            typeInput === 'checkbox' ?
                                <FormGroup
                                    className='label d-flex align-items-center createCaseBody__checkbox'>
                                    <Input
                                        className='me-2'
                                        type={typeInput}
                                        id={nesting ? nesting + '.' + label : label}
                                    />
                                    <Label htmlFor={nesting ? nesting + '.' + label : label} className='mb-0'>
                                        {checkboxLabel}
                                    </Label>
                                </FormGroup>
                                :
                                <input
                                    className='form-control'
                                    type={typeInput}
                                    id='example-date-input'
                                    {...field}
                                />

                        }

                        </div>
                    )}
                </Field>
            )}
        </Col>
    );
};

export default FieldForm;
