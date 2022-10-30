import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, TabPane, Card, CardBody, Button } from 'reactstrap';
import { Formik, Form } from 'formik';
import { RootState } from 'store/reducers';
import { getJudicialCaseInfo, updateJudicialCaseInfo } from 'store/actions';
import { getCaseInfoDataForEdit } from 'store/selectors';
import { FormField } from 'components';
import { FormTable } from './components';
import { FIELDS_FOR_FORM_BY_TYPE } from './PanelInformationConstants';

const PanelInformation = (props: any) => {
  const { getJudicialCaseInfo, updateJudicialCaseInfo, caseInfo } = props;
  const [isResetEditing, setIsResetEditing] = useState<boolean>(false);

  useEffect(() => {
    getJudicialCaseInfo();
  }, [getJudicialCaseInfo]);

  if (!caseInfo) return null;

  return (
    <Formik
      initialValues={{ ...caseInfo }}
      onSubmit={async values => {
        setIsResetEditing(true);
        updateJudicialCaseInfo(values);
        setIsResetEditing(false);
      }}
    >
      {({ values, resetForm }) => (
        <Form>
          <br />
          <Row>
            <FormField label='№' value={values.case_id} />
            <FormField label='uid' value={values.uid} />
            <FormField label='date' value={values.start} />

            <Col />
          </Row>

          <br />
          <br />
          <br />
          <Row>
            <Col>
              <TabPane tabId='3' id='v-pills-confir' role='tabpanel'>
                <Card className='shadow-none border mb-0'>
                  <CardBody>
                    <div className='d-flex align-items-center'>
                      <i className='mdi mdi-account-circle text-primary h1' />
                      <strong className='text-primary px-1 pb-1'>Истец</strong>
                    </div>
                    <FormTable
                      data={values?.plaintiff}
                      name='plaintiff'
                      rows={FIELDS_FOR_FORM_BY_TYPE[values?.plaintiff_type]}
                      isResetEditing={isResetEditing}
                    />
                  </CardBody>
                </Card>
              </TabPane>
            </Col>
            <Col>
              <TabPane tabId='3' id='v-pills-confir' role='tabpanel'>
                <Card className='shadow-none border mb-0'>
                  <CardBody>
                    <div className='d-flex align-items-center'>
                      <i className='mdi mdi-account-circle text-primary h1' />
                      <strong className='text-primary px-1 pb-1'>
                        Ответчик
                      </strong>
                    </div>
                    <FormTable
                      data={values?.defendant}
                      name='defendant'
                      rows={FIELDS_FOR_FORM_BY_TYPE[values?.defendant_type]}
                      isResetEditing={isResetEditing}
                    />
                  </CardBody>
                </Card>
              </TabPane>
            </Col>
          </Row>
          <div className='mt-5 d-flex justify-content-end'>
            <Button
              type='button'
              color='secondary'
              data-dismiss='modal'
              onClick={() => resetForm({ ...caseInfo })}
              className='me-3'
            >
              Отмена
            </Button>
            <Button type='submit' color='primary'>
              Сохранить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const mapStatetoProps = (state: RootState) => {
  return { caseInfo: getCaseInfoDataForEdit(state) };
};

export default connect(mapStatetoProps, {
  getJudicialCaseInfo,
  updateJudicialCaseInfo,
})(PanelInformation);
