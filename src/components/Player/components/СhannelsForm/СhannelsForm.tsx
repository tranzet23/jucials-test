import { parseParticipantsForSubmit } from 'utils/app_helper';
import NameSelections from '../NameSelections/NameSelections';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import {
  updateParticipants,
  setInfoJudicialHearing,
} from 'store/judicialHearing/actions';

import { getDataHearingByChannel } from 'store/judicialHearing/selectors';
import { RootState } from 'store/reducers';
import { IParticipants } from 'store/judicialHearing/types';
import { DEFAULT_PARTICIPANT } from 'constants/app_сonstants';

function СhannelsForm(props: any) {
  const { hearingData, playerType, updateParticipants, channels } = props;

  if (!channels) return null;
  let channelsNumber: number = parseInt(channels);

  function initDefaultValues() {
    if (!hearingData) return null;

    let sortedHearingData: IParticipants[] = Array.from(
      { length: channelsNumber },
      (_, i) => DEFAULT_PARTICIPANT,
    );

    for (let participant of hearingData?.participants) {
      sortedHearingData[parseInt(participant.channel) - 1] = participant;
    }

    return sortedHearingData.filter(el => el);
  }
  console.clear()
  console.log(initDefaultValues())

  return (
    <Formik
      initialValues={{
        channels: initDefaultValues(),
      }}
      enableReinitialize
      onSubmit={values => {
        let participants = parseParticipantsForSubmit(
          values.channels,
          hearingData?.participants,
        );
        if (participants) {
          updateParticipants(participants);
        }
      }}
    >
      <div
        className={`wavesurfer-container ${
          playerType === 'split'
            ? 'multi-channel'
            : playerType === 'hide'
            ? 'folded'
            : ''
        }
      ${hearingData ? '' : 'reverse'}`}
      >
        {playerType === 'split' && hearingData && (
          <NameSelections
            hearingData={hearingData}
            setWaveColors={() => {}}
            channelsNumber={channelsNumber}
          />
        )}
        <div
          className='wavesurfer-track'
          style={{
            gridRowEnd: `span ${channelsNumber}`,
          }}
        >
          {props.children}
        </div>

        {playerType === 'split' && (
          <>
            {Array.from({ length: channelsNumber }, (x, i) => (
              <div key={`channel_${i}`} className='channel'>
                Канал {i + 1}
              </div>
            ))}
          </>
        )}
      </div>
    </Formik>
  );
}

const mapStatetoProps = (state: RootState) => {
  const hearingData = getDataHearingByChannel(state);
  const { channels } = state.Transcription;

  return { hearingData, channels };
};

export default connect(mapStatetoProps, {
  updateParticipants,
  setInfoJudicialHearing,
})(СhannelsForm);
