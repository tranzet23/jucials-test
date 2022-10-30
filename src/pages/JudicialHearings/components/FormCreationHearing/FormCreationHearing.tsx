import {connect} from 'react-redux';
import {Form, Formik} from 'formik';
import {Row, Modal, Button} from 'reactstrap';
import {withRouter} from 'react-router-dom';
import logoLightSvg from 'assets/images/logo-light.svg';
import {RootState} from 'store/reducers';
import {updateModeHearing, addJudicialHearing} from 'store/actions';
import {getCaseInfo} from 'store/selectors';
import FormAddParticipant from '../FormAddParticipant/FormAddParticipant';
import {FormField} from 'components';
import {IControllerHearingProps} from './FormCreationHearingTypes';

const getNameByType = (type: 0 | 1, data: any) => {
    if (!data) return '';

    switch (type) {
        case 1:
            return data.company;
        case 0:
            return [data.lastname, data.name, data.surname].join(' ');
        default:
            return '';
    }
};

const FormCreationHearing = ({
                                 history,
                                 modeHearing,
                                 caseInfo,
                                 updateModeHearing,
                                 addJudicialHearing,
                             }: IControllerHearingProps) => {
    const titleByType = modeHearing === 'planned' ? 'Запланировать' : 'Начать';
    const dateTime = new Date();
    const isOpen =
        (modeHearing === 'planned' || modeHearing === 'recorning') &&
        Boolean(caseInfo);

    const onModeChange = () => {
        updateModeHearing('none');
    };

    return (
        <Modal isOpen={isOpen} toggle={onModeChange} centered>
            <div onClick={onModeChange} className='modal-closebtn'>
                <i className='fas fa-times'/>
            </div>
            <div className='bg-primary bg-soft modal-header__narrow'>
                <div className='text-primary'>
                    <h5 className='text-primary h3'>{titleByType} заседание</h5>
                </div>
                <div className='modal-logo-header'>
          <span className='logo-lg'>
            <img src={logoLightSvg} alt='' height='50'/>
          </span>
                </div>
            </div>
            <Formik
                initialValues={{
                    participants: caseInfo?.participants || [],
                    case_id: caseInfo?.id || '',
                    date: dateTime.toISOString().substring(0, 10),
                    time: dateTime.toLocaleTimeString().slice(0, 5),
                }}
                onSubmit={async values => {
                    addJudicialHearing({...values, result: modeHearing}, history);
                    if (modeHearing === 'planned') {
                        onModeChange();
                    }
                }}
            >
                {({values}) => (
                    <Form>
                        <div className='modal-body '>
                            <Row>
                                <FormField label='uid' value={caseInfo?.uid || ''}/>
                                <FormField label='case_id' value={caseInfo?.case_id || ''}/>
                                <FormField
                                    label='plaintiff'
                                    value={getNameByType(
                                        caseInfo?.plaintiff_type || 0,
                                        caseInfo?.plaintiff || null,
                                    )}
                                />
                                <FormField
                                    label='defendant'
                                    value={getNameByType(
                                        caseInfo?.defendant_type || 0,
                                        caseInfo?.defendant || null,
                                    )}
                                />
                            </Row>
                            <br/>
                            <Row className='mb-4'>
                                <FormField label='date' value={values.date} typeInput='date'/>
                                <FormField label='time' value={values.time} typeInput='time'/>
                            </Row>
                            <FormAddParticipant values={values}/>
                            <div className='mt-5 modal-buttons-container'>
                                <Button
                                    type='button'
                                    onClick={onModeChange}
                                    color='secondary'
                                    data-dismiss='modal'
                                >
                                    Отмена
                                </Button>
                                <Button type='submit' color='primary'>
                                    {titleByType}
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

const mapStatetoProps = (state: RootState) => {
    const {modeHearing} = state.JudicialHearing;

    return {modeHearing, caseInfo: getCaseInfo(state)};
};

export default connect(mapStatetoProps, {
    updateModeHearing,
    addJudicialHearing,
})(withRouter(FormCreationHearing));
