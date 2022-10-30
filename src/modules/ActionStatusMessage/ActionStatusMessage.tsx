import { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { RootState } from 'store/reducers';
import { setActionStatus } from 'store/actions';
import { IActionStatusMessage } from './ActionStatusMessageTypes';

const ActionStatusMessage = (props: IActionStatusMessage) => {
  const { status, message, setActionStatus } = props;

  const onCloseAlert = useCallback(() => {
    setActionStatus({ message: undefined });
  }, [setActionStatus]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (message) {
      timer = setTimeout(() => {
        onCloseAlert();
      }, 8000);
    }
    return () => {
      if (message) {
        clearTimeout(timer);
        onCloseAlert();
      }
    };
  }, [message, onCloseAlert]);

  return (
    <div id='toast-container' className='toast-bottom-center'>
      <Alert
        isOpen={message ? true : false}
        role='alert'
        className='toast-alert'
        color={status}
        toggle={onCloseAlert}
      >
        {message}
      </Alert>
    </div>
  );
};

const mapStatetoProps = (state: RootState) => {
  const { status, message } = state.ActionStatus;
  return { status, message };
};

export default connect(mapStatetoProps, { setActionStatus })(
  ActionStatusMessage,
);
