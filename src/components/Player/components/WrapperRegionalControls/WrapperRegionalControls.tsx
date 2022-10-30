import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { useFormik, Form } from 'formik';
import { updateParticipants } from 'store/judicialHearing/actions';
import { getDataHearing } from 'store/judicialHearing/selectors';
import { RootState } from 'store/reducers';
import { IWrapperRegionalControls } from './WrapperRegionalControlsTypes';

function WrapperRegionalControls(props: IWrapperRegionalControls) {
  const { refWavesurfer, isPlayerReady, hearingData, updateParticipants } =
    props;

  const [dataEditing, setDataEditing] = useState<boolean>(false);

  const { handleSubmit, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: {
      participants: hearingData?.participants,
    },
    onSubmit: async values => {
      if (dataEditing) {
        if (values.participants) {
          updateParticipants(values.participants);
          setDataEditing(false);
        }
      }
    },
  });

  useEffect(() => {
    if (refWavesurfer.current && isPlayerReady) {
      refWavesurfer.current.on('region-update-end', event => {
        let findedIndex = -1;
        if (hearingData?.participants) {
          findedIndex = hearingData.participants.findIndex(
            el => el.id === event.data.id,
          );
        }

        if (findedIndex > -1) {
          setFieldValue(`participants.${findedIndex}`, {
            channel: event.data.channel,
            color: event.data.color,
            id: event.data.id,
            lastname: event.data.lastname,
            name: event.data.name,
            surname: event.data.surname,
            type: event.data.type,
            timeEnd: event.end,
            timeStart: event.start,
          });
        }
        setDataEditing(true);
      });

      refWavesurfer.current.container.addEventListener('mouseleave', () => {
        if (dataEditing) {
          handleSubmit();
        }
      });
    }
  }, [
    refWavesurfer,
    isPlayerReady,
    dataEditing,
    setFieldValue,
    handleSubmit,
    setDataEditing,
    hearingData?.participants,
  ]);

  return <Form>{props.children}</Form>;
}

const mapStatetoProps = (state: RootState) => {
  const hearingData = getDataHearing(state);
  const { isPlayerReady } = state.Transcription;

  return { isPlayerReady, hearingData };
};
export default connect(mapStatetoProps, { updateParticipants })(
  WrapperRegionalControls,
);
