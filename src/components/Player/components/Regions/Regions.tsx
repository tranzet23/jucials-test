import { connect } from 'react-redux';
import { RootState } from 'store/reducers';
import RegionsChannel from '../RegionsChannel/RegionsChannel';
import RegionsDiarization from '../RegionsDiarization/RegionsDiarization';
import { ITRegionsProps } from './RegionsTypes';

const Regions = (props: ITRegionsProps) => {
  const { isUseDiarization, playerType, refWavesurfer } = props;

  return (
    <>
      {isUseDiarization ? (
        <RegionsDiarization
          refWavesurfer={refWavesurfer}
          playerType={playerType}
        />
      ) : (
        <RegionsChannel refWavesurfer={refWavesurfer} playerType={playerType} />
      )}
    </>
  );
};

const mapStatetoProps = (state: RootState) => {
  const { isUseDiarization } = state.Transcription;

  return { isUseDiarization };
};

export default connect(mapStatetoProps, {}, null, { forwardRef: true })(
  Regions,
);
