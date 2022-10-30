import React, { useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min';
import RegionPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions';
import { connect } from 'react-redux';

import { setStatusPlayer } from 'store/actions';
import { getFormatedTime } from 'utils/app_helper';
import { getOptions } from './WavesurferConstants';
import { IWavesurferWaveProps } from './WavesurferTypes';

const Wavesurfer = React.forwardRef((props: IWavesurferWaveProps, ref: any) => {
  const waveformRef = React.useRef<any>(null);
  const { soundFilePath, typePlayer, waveform, currentTime, setStatusPlayer } =
    props;
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: waveformRef.current,
      backend: 'MediaElement',
      hideScrollBar: true,
      waveColor: '#DEE4EF',
      progressColor: '#2A3042',
      cursorColor: '#556EE6',
      barGap: 3,
      barWidth: 3,
      barRadius: 3,
      barMinHeight: 1,
      cursorWidth: 1,
      normalize: true,
      responsive: true,
      ...getOptions(typePlayer),
      plugins: [
        TimelinePlugin.create({
          container: '#wave-timeline',
          // timeInterval: 10,
          // timeInterval: 0.1,
          // secondaryLabelInterval: 5,
          // primaryLabelInterval: 10,
          height: 10,
          primaryColor: '#DEE4EF',
          secondaryColor: '#DEE4EF',
          primaryFontColor: '#4353FF',
          secondaryFontColor: '#C3CEDB',
        }),

        RegionPlugin.create({
          channelCount:
            waveform?.length > 1 ? waveform.length - 1 : waveform.length,
        }),
      ],
    });

    if (typePlayer === 'mono') {
      waveSurfer.load(soundFilePath, waveform[0]);
    } else if (typePlayer === 'split') {
      waveSurfer.load(
        soundFilePath,
        waveform?.length > 1 ? waveform.slice(1) : waveform[0],
      );
    }

    waveSurfer.on('ready', () => {
      waveSurfer.setCursorColor('#556ee600');
      if (currentTime !== 0) {
        waveSurfer.setCurrentTime(currentTime);
      }
      waveSurfer.setCursorColor('#556EE6');
      setDuration(waveSurfer.getDuration());
      ref.current = waveSurfer;

      if (typePlayer === 'hide') {
        waveSurfer.mediaContainer
          .querySelector('wave > canvas')
          ?.classList.add('folded-player__progress');

        waveSurfer.mediaContainer
          .querySelector('div > wave > canvas')
          ?.classList.add('folded-player__wave');
      }

      setStatusPlayer(true);
    });

    return () => {
      waveSurfer.destroy();
      setStatusPlayer(false);
    };
  }, [ref, setStatusPlayer, soundFilePath, typePlayer, waveform, currentTime]);

  return (
    <>
      {typePlayer === 'hide' && (
        <div className='player__progress-time inverted-bar'>
          <p className='inverted-item'>{getFormatedTime(currentTime)}</p>
          <p className='inverted-item'>{getFormatedTime(duration)}</p>
        </div>
      )}
      <div ref={waveformRef}></div>
      <div style={{ gridRowStart: `3`, height: '0' }}>
        <div id='wave-timeline'></div>
      </div>
    </>
  );
});

//export default Wavesurfer;

export default connect(() => ({}), { setStatusPlayer }, null, {
  forwardRef: true,
})(Wavesurfer);
