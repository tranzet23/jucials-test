import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'store/reducers';
import { POS_STEP } from 'constants/sound_controls';
import Controls from '../Controls/Controls';
import Hotkeys from '../Hotkeys/Hotkeys';
import { IPropsPlayer } from './PanelControlsTypes';

function PanelControls(props: IPropsPlayer) {
  const {
    refWavesurfer,
    isPlayerReady,
    playerType,
    setPlayerType,
    setCurrentTime,
  } = props;
  const [volume, setVolume] = useState(0.5);
  const [soundSpeed, setSoundSpeed] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
  }, [playerType]);

  useEffect(() => {
    if (isPlayerReady && refWavesurfer.current) {
      refWavesurfer.current.setVolume(Number(volume.toFixed(1)));
      refWavesurfer.current.setPlaybackRate(soundSpeed);
    }
  }, [playerType, isPlayerReady, refWavesurfer, volume, soundSpeed]);

  // === Функции контролов ===
  function rewindForward() {
    if (refWavesurfer.current) {
      // Чтобы при перемотке за пределы трека он не начинал автоматически воспроизводиться заново,
      // делаем так чтобы он зваершился по "естествиной" пречине
      if (
        refWavesurfer.current.getCurrentTime() + POS_STEP >
        refWavesurfer.current.getDuration()
      ) {
        refWavesurfer.current.skip(
          refWavesurfer.current.getDuration() -
            refWavesurfer.current.getCurrentTime() -
            0.001,
        );
      } else {
        refWavesurfer.current.skipForward(POS_STEP);
      }
    }
  }

  function rewindBackward() {
    if (refWavesurfer.current) {
      refWavesurfer.current.skipBackward(POS_STEP);
    }
  }

  const onClickPlaying = () => {
    setIsPlaying(prev => !prev);
    refWavesurfer.current.playPause();

    refWavesurfer.current.on('finish', () => {
      setTimeout(() => {
        setIsPlaying(false);
      }, 0);
    });
  };

  const onСhangeVolume = (volume: any) => {
    setVolume(volume);
    refWavesurfer.current.setVolume(Number(volume.toFixed(1)));
  };

  const onСhangeSoundSpeed = (speed: any) => {
    setSoundSpeed(speed);

    refWavesurfer.current.playPause(speed);
    refWavesurfer.current.setPlaybackRate(speed);
    refWavesurfer.current.playPause();
  };

  const onPlayerType = (type: any) => {
    if (refWavesurfer.current) {
      setCurrentTime(refWavesurfer.current.getCurrentTime());
    }
    setPlayerType(type);
  };

  return (
    <div>
      <Hotkeys
        setIsPlaying={onClickPlaying}
        setVolume={onСhangeVolume}
        setSoundSpeed={onСhangeSoundSpeed}
        rewindForward={rewindForward}
        rewindBackward={rewindBackward}
        isPlayerReady={isPlayerReady}
      />

      <Controls
        soundSpeed={soundSpeed}
        setSoundSpeed={onСhangeSoundSpeed}
        isPlaying={isPlaying}
        setIsPlaying={onClickPlaying}
        volume={volume}
        setVolume={onСhangeVolume}
        rewindForward={rewindForward}
        rewindBackward={rewindBackward}
        playerType={playerType}
        setPlayerType={onPlayerType}
        isLoading={false}
      >
        {props.children}
      </Controls>
    </div>
  );
}

const mapStatetoProps = (state: RootState) => {
  const { isPlayerReady } = state.Transcription;

  return { isPlayerReady };
};

export default connect(mapStatetoProps, {})(PanelControls);
