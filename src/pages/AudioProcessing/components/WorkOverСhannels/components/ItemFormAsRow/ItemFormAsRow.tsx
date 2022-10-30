import { useFormikContext, Field } from 'formik';
import { Label, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { RootState } from 'store/reducers';
import { IParticipants } from 'store/judicialHearing/types';
import { FormFieldAsSelect } from 'components';
import { PanelColor } from 'modules';
import { ucFirst, getTheFirstLetter } from 'utils/app_helper';
import { IItemFormAsRowProps } from './ItemFormAsRowTypes';
import { LIST_CHANNELS } from './ItemFormAsRowConstants';

const ItemFormAsRow = ({ nameField, countChannels }: IItemFormAsRowProps) => {
  const { values, setFieldValue } = useFormikContext<IParticipants[]>();

  if (Object.keys(values).length < 1) return null;

  const listPathsToValue = nameField.split('.');
  if (!values[listPathsToValue[0]]) return null;
  const valueItem = values[listPathsToValue[0]][listPathsToValue[1]] || {};

  const onUpdateIndicatorColor = (color: string) => {
    setFieldValue(`${nameField}.color`, color);
  };

  const nameParticipant = [
    ' ',
    valueItem.lastname,
    ' ',
    getTheFirstLetter(valueItem.name),
    '.',
    getTheFirstLetter(valueItem.surname),
    '.',
  ].join('');

  return (
    <Row>
      <Col>
        <div className='row'>
          <Label className='col-form-label'>
            <strong>{ucFirst(valueItem.type)}: </strong>
            {nameParticipant}
          </Label>
        </div>
      </Col>
      <Col>
        <FormFieldAsSelect fieldName={`${nameField}.channel`}>
          <>
            {/* <Options listOptions={LIST_CHANNEL} numberDisabledOption={0} /> */}
            <option disabled value={0}>
              Номер канала
            </option>

            {LIST_CHANNELS.slice(0, countChannels || 5).map((channel, item) => (
              <option key={item} value={item + 1}>
                {channel}
              </option>
            ))}
          </>
        </FormFieldAsSelect>
      </Col>
      <Col>
        <div className='d-flex align-items-center'>
          <Field
            name={`${nameField}.timeStart`}
            type='time'
            step='2'
            className='form-control'
          />
          <i className={`mdi mdi-arrow-right px-2`}></i>
          <Field
            name={`${nameField}.timeEnd`}
            type='time'
            step='2'
            className='form-control'
          />
        </div>
      </Col>

      <Col>
        <PanelColor
          selectedColor={valueItem.color}
          changeColor={onUpdateIndicatorColor}
        />
      </Col>
      <Col></Col>
    </Row>
  );
};

const mapStatetoProps = (state: RootState) => {
  const { channels } = state.Transcription;
  return {
    countChannels: channels,
  };
};

export default connect(mapStatetoProps, {})(ItemFormAsRow);
