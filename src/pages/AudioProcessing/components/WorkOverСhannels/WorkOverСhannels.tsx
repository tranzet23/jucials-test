import { Card, CardBody, Button } from 'reactstrap';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { RootState } from 'store/reducers';
import { getTimeAsSecond } from 'utils/app_helper';
import { getInfoJudicialHearing, updateParticipants } from 'store/actions';
import {
  getTilteWithHearingIdAndCaseName,
  getDataHearingSpecificTime,
} from 'store/selectors';

import { Table } from 'components';
import { ItemFormAsRow } from './components';
import { IWorkOverHearingsProps } from './WorkOverСhannelsTypes';

const WorkOverСhannels = (props: IWorkOverHearingsProps) => {
  const { dataHearing, updateParticipants } = props;

  if (!dataHearing) return null;

  const columns = [
    {
      dataField: 'id',
      text: '',
      headerAttrs: {
        hidden: true,
      },

      formatter: (_: any, __, item: number) => {
        return <ItemFormAsRow nameField={`rows.${item}`} />;
      },
    },
  ];

  return (
    <Card>
      <CardBody>
        <Formik
          enableReinitialize
          initialValues={{
            rows: [...dataHearing?.participants],
            mode: 'none',
          }}
          onSubmit={async values => {
            if (values.rows) {
              updateParticipants(
                values.rows.map(value => ({
                  ...value,

                  timeEnd: getTimeAsSecond(value.timeEnd.toString()),
                  timeStart: getTimeAsSecond(value.timeStart.toString()),
                })),
              );
            }
          }}
        >
          {() => (
            <Form>
              <div className='panel-channel__table'>
                <Table
                  data={dataHearing?.participants}
                  columns={columns}
                  keyField='id'
                />

                <div className='mt-5 modal-buttons-container'>
                  <Button type='submit' color='primary'>
                    Сохранить
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};
const mapStatetoProps = (state: RootState) => {
  const dataHearing = getDataHearingSpecificTime(state);

  return {
    dataHearing,
    tilte: getTilteWithHearingIdAndCaseName(state),
  };
};

export default connect(mapStatetoProps, {
  getInfoJudicialHearing,
  updateParticipants,
})(WorkOverСhannels);
