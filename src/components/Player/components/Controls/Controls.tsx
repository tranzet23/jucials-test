import React from 'react';
import { IPropsControls } from './ControlsTypes';
import {
  VOLUME_MAX,
  VOLUME_STEP,
  SOUND_SPEED_STEP,
  SOUND_SPEED_MIN,
  SOUND_SPEED_MAX,
} from 'constants/sound_controls';
import volumeIcon from 'assets/images/volume.svg';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Button } from 'reactstrap';

export default function Controls(props: IPropsControls) {
  const {
    soundSpeed,
    setSoundSpeed,
    isPlaying,
    setIsPlaying,
    volume,
    setVolume,
    rewindForward,
    rewindBackward,
    playerType,
    setPlayerType,

    isLoading,
  } = props;
  return (
    <div className='control'>
      {playerType !== 'hide' && (
        <div>
          {playerType === 'mono' ? (
            <Button
              color='primary'
              className='control__channel-button'
              outline={true}
              onClick={() => {
                setPlayerType('split');
              }}
              disabled={isLoading}
            >
              Отобразить поканально
            </Button>
          ) : playerType === 'split' ? (
            <Button
              color='primary'
              className='control__channel-button'
              outline={true}
              onClick={() => {
                setPlayerType('mono');
              }}
              disabled={isLoading}
            >
              Свернуть каналы
            </Button>
          ) : null}
          {/* <Button
            color='primary'
            className='btn btn-outline-primary d-flex align-items-center player-fold__button justify-content-center w-lg control__channel-button'
            onClick={() => setPlayerType('hide')}
          >
            Свернуть плеер
          </Button> */}
        </div>
      )}
      {playerType !== 'hide' && <div className='control__separator' />}
      <button
        title='Назад'
        className='control__button rewind-backwards btn'
        onClick={rewindBackward}
        onKeyDown={e => {
          if (e.keyCode === 32) {
            e.preventDefault();
          }
        }}
        disabled={isLoading}
      >
        <i className='fas fa-lg fa-backward' />
      </button>
      <button
        title='Плей'
        className='control__button play btn'
        onClick={() => {
          setIsPlaying(prev => !prev);
        }}
        // Если с кнопкой в фокусе нажать пробел то playPause() запуститься дважды,
        // поэтому предотврощаем управления кнопкой клавиатурой
        onKeyDown={e => {
          if (e.keyCode === 32) {
            e.preventDefault();
          }
        }}
        disabled={isLoading}
      >
        {isPlaying ? (
          <i className='fas fa-pause' />
        ) : (
          <i className='fas fa-play' style={{ paddingLeft: '2px' }} />
        )}
      </button>
      <button
        title='Вперёд'
        className='control__button rewind-forwards btn'
        onClick={rewindForward}
        onKeyDown={e => {
          if (e.keyCode === 32) {
            e.preventDefault();
          }
        }}
        disabled={isLoading}
      >
        <i className='fas fa-lg fa-forward' />
      </button>
      {playerType !== 'hide' ? <div className='control__separator' /> : <div />}
      <div className='sound-speed-controls'>
        <label
          title='Скорость воспроизведения'
          className='control__icon'
          htmlFor='sound-speed'
        >
          <i className='fas fa-fast-forward' />
        </label>
        <input
          title='Скорость воспроизведения'
          className='form-range'
          name='sound-speed'
          id='sound-speed'
          type='range'
          step={SOUND_SPEED_STEP.toString()}
          min={SOUND_SPEED_MIN.toString()}
          max={SOUND_SPEED_MAX.toString()}
          value={soundSpeed}
          onChange={e => {
            setSoundSpeed(Number(e.target.value));
          }}
          disabled={isLoading}
        />
        <select
          className='form-select'
          value={soundSpeed}
          onChange={e => {
            // Фикс бага при котором теряется синхронизация во время ускорения и замедления
            // https://github.com/katspaugh/wavesurfer.js/issues/2349

            setSoundSpeed(Number(e.target.value));
          }}
          disabled={isLoading}
        >
          <option value={0.25}>0.25</option>
          <option value={0.5}>0.5</option>
          <option value={0.75}>0.75</option>
          <option value={1}>1</option>
          <option value={1.25}>1.25</option>
          <option value={1.5}>1.5</option>
          <option value={1.75}>1.75</option>
          <option value={2}>2</option>
        </select>
      </div>
      {playerType !== 'hide' ? <div className='control__separator' /> : <div />}
      <div className='volume-controls'>
        {playerType === 'hide' ? (
          <div>
            <img src={volumeIcon} alt={'Громкость'} draggable='false' />
            <CircularProgressbar
              value={volume * 100}
              strokeWidth={18}
              styles={buildStyles({
                strokeLinecap: 'butt',
                pathColor: '#556EE6',
                trailColor: '#F4F4F4',
              })}
            />
          </div>
        ) : (
          <>
            <label className='control__icon' htmlFor='volume'>
              <i className='fas fa-volume-up' />
            </label>
            <input
              title='Громкость'
              id='volume'
              className='form-range'
              type='range'
              step={VOLUME_STEP.toString()}
              min='0'
              max={VOLUME_MAX.toString()}
              value={volume}
              onChange={e => {
                setVolume(Number(e.target.value));
              }}
              disabled={isLoading}
            />
          </>
        )}
      </div>
      {playerType === 'hide' ? null : <div className='control__separator' />}
      {playerType === 'hide' ? null : <>{props.children}</>}
    </div>
  );
}
