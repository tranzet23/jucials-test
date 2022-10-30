import { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'store/reducers';
import { getRegions } from 'store/judicialHearing/selectors';

import { ITRegionsProps } from './RegionsChannelTypes';

const RegionsChannel = (props: ITRegionsProps) => {
  const { refWavesurfer, regions, playerType, isPlayerReady } = props;

  useEffect(() => {
    if (refWavesurfer.current && isPlayerReady) {
      refWavesurfer.current.clearRegions();
      regions.forEach(region => refWavesurfer.current.addRegion(region));
    }
  }, [refWavesurfer, playerType, regions, isPlayerReady]);

  return <></>;
};

const mapStatetoProps = (state: RootState) => {
  const regions = getRegions(state);
  const { isPlayerReady } = state.Transcription;

  return { regions, isPlayerReady };
};

export default connect(mapStatetoProps, {}, null, { forwardRef: true })(
  RegionsChannel,
);
