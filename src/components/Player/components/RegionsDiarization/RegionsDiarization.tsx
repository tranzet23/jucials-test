import { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'store/reducers';
import { getRegionsTranscrib } from 'store/transcription/selectors';

import { ITRegionsProps } from './RegionsDiarizationTypes';

const RegionsDiarization = (props: ITRegionsProps) => {
  const {
    refWavesurfer,
    regions,
    playerType,
    isPlayerReady,
    isUseDiarization,
  } = props;

  useEffect(() => {
    if (refWavesurfer.current && isPlayerReady && isUseDiarization) {
      refWavesurfer.current.clearRegions();
      regions.forEach(region => refWavesurfer.current.addRegion(region));
    }
  }, [refWavesurfer, playerType, regions, isPlayerReady, isUseDiarization]);

  return <></>;
};

const mapStatetoProps = (state: RootState) => {
  const regions = getRegionsTranscrib(state);
  const { isPlayerReady, isUseDiarization } = state.Transcription;

  return { regions, isPlayerReady, isUseDiarization };
};

export default connect(mapStatetoProps, {}, null, { forwardRef: true })(
  RegionsDiarization,
);
