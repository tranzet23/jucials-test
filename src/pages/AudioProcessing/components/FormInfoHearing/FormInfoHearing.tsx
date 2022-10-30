import { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import { Row, Button, Card, CardBody, Col } from 'reactstrap';
import { RootState } from 'store/reducers';
import { updateParticipants } from 'store/actions';
import { getDataHearing } from 'store/judicialHearing/selectors';
import { getRandomInt } from 'utils/app_helper';
import FormAddParticipant from '../FormAddParticipant/FormAddParticipant';
import { FormField } from 'components';
import { IControllerHearingProps } from './FormInfoHearingTypes';

const FormInfoHearing = ({
  dataHearing,
  updateParticipants,
}: IControllerHearingProps) => {
  const dateTime = new Date();
  const [isResetEditing, setIsResetEditing] = useState<boolean>(false);

  if (!dataHearing) return null;

  return (
    <Col xs='12'>
      <Card>
        <CardBody>
          <Formik
            enableReinitialize
            initialValues={{
              participants: dataHearing?.participants || [],
              id: dataHearing?.id || getRandomInt(100),
              date: dateTime.toISOString().substring(0, 10),
              time: dateTime.toLocaleTimeString().slice(0, 5),
            }}
            onSubmit={async values => {
              setIsResetEditing(true);
              updateParticipants(values?.participants);
              setIsResetEditing(false);
            }}
          >
            {({ values }) => (
              <Form
                className='form-court-hearing'
                onKeyPress={e => {
                  if (e.charCode === 13) {
                    e.preventDefault();
                  }
                }}
              >
                <Row>
                  <div className='col-2 ps-3'>
                    <FormField label='case_id' value={dataHearing?.id || ''} />
                  </div>
                  <div className='col-2'>
                    <FormField label='date' value={values.date} />
                  </div>
                  <div className='col-2'>
                    <FormField label='time' value={values.time} />
                  </div>
                </Row>
                <br />

                <FormAddParticipant
                  values={values}
                  isResetEditing={isResetEditing}
                />
                <div className='mt-5 modal-buttons-container'>
                  <Button type='submit' color='primary'>
                    Сохранить
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </Col>
  );
};

const mapStatetoProps = (state: RootState) => {
  return { dataHearing: getDataHearing(state) };
};

export default connect(mapStatetoProps, {
  updateParticipants,
})(FormInfoHearing);
