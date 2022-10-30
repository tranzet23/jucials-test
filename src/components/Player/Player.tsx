import React, { useState } from 'react';

import { IPropsPlayer } from './PlayerTypes';
import {
  Wavesurfer,
  СhannelsForm,
  PanelControls,
  Regions,
  WrapperRegionalControls,
} from './components';

const Player = (props: IPropsPlayer) => {
  const { soundFilePath, waveform, playerType, setPlayerType } = props;
  const refWavesurfer = React.createRef<any>();
  const [currentTime, setCurrentTime] = useState(0.0);

  return (
    <div id='wave'>
      <СhannelsForm playerType={playerType}>
        <WrapperRegionalControls refWavesurfer={refWavesurfer}>
          <Wavesurfer
            ref={refWavesurfer}
            soundFilePath={soundFilePath}
            typePlayer={playerType}
            waveform={waveform}
            currentTime={currentTime}
          ></Wavesurfer>
        </WrapperRegionalControls>
        <Regions refWavesurfer={refWavesurfer} playerType={playerType} />
      </СhannelsForm>
      <PanelControls
        refWavesurfer={refWavesurfer}
        playerType={playerType}
        setPlayerType={setPlayerType}
        setCurrentTime={setCurrentTime}
      >
        {props.children}
      </PanelControls>
    </div>
  );
};

function moviePropsAreEqual(prevMovie, nextMovie) {
  return (
    prevMovie.playerType === nextMovie.playerType &&
    prevMovie.waveform === nextMovie.waveform
  );
}

export const PlayerMemo = React.memo(Player, moviePropsAreEqual);
