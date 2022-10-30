import { Row, Button } from 'reactstrap';
import { FIELDS_FORM_PARTICIPANT } from './FormAddParticipantConstant';
import { IFormAddParticipantProps } from './FormAddParticipantTypes';

const FormAddParticipant = ({
  onOpen,
}: IFormAddParticipantProps): JSX.Element => {
  const onButtonCancelClick = () => {
    onOpen(false);
  };
  return (
    <div className={`participant`}>
      {FIELDS_FORM_PARTICIPANT.map(field => (
        <Row className='mb-2'>
          <label className='col-md-2 col-form-label'>{field.name}</label>
          <div className='col-md-10'>
            <input
              className='form-control'
              name={field.name}
              type={field.type}
            />
          </div>
        </Row>
      ))}
      <div className='mb-2 d-flex justify-content-end'>
        <Button
          color='light'
          outline
          className='p-1 mx-1'
          onClick={onButtonCancelClick}
        >
          Отмена
        </Button>
        <Button color='primary' outline className='p-1  mx-1'>
          Добавить
        </Button>
      </div>
    </div>
  );
};
export default FormAddParticipant;
