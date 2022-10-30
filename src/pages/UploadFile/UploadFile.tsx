import { Row, Col, Card, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import { RootState } from 'store/reducers';
import { Breadcrumbs } from 'components';
import { FormUpload } from 'modules';

import { IUploadFileProps } from './UploadFileTypes';

const UploadPage = ({ caseNumber }: IUploadFileProps) => {
  return (
    <>
      <Breadcrumbs
        title={`загрузка записи заседания по делу №${caseNumber}`}
        breadcrumbItems={['Аудио файлы заседания', 'Загрузка']}
      />
      <Row>
        <Col xs='12'>
          <Card>
            <CardBody>
              <FormUpload title='Загрузка файла' />
            </CardBody>
          </Card>
          <br />
        </Col>
      </Row>
    </>
  );
};

const mapStatetoProps = (state: RootState) => {
  const { selectedCaseNumber } = state.JudicialCases;

  return { caseNumber: selectedCaseNumber || '_' };
};

export default connect(mapStatetoProps, {})(UploadPage);
