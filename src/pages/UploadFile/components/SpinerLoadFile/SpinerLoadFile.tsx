import { CardBody } from 'reactstrap';
import { SpinerDotWithTimeout } from 'components';

const SpinerLoadFile = () => {
  return (
    <CardBody className='d-flex justify-content-center align-items-baseline'>
      <strong className='me-2'> Идет загрузка файла </strong>
      <SpinerDotWithTimeout sleep={50} />
      <SpinerDotWithTimeout sleep={100} />
      <SpinerDotWithTimeout sleep={200} />
    </CardBody>
  );
};

export default SpinerLoadFile;
