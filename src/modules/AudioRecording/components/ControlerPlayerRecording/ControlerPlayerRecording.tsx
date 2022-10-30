import React from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import { keyMap } from 'constants/sound_controls';
import { IControlerPlayerRecordingProps } from './ControlerPlayerRecordingTypes';

function ControlerPlayerRecording({
  statusRecord,
  setStatusRecord,
}: IControlerPlayerRecordingProps) {
  const handlers = {
    SPACE: (e: any) => {
      setStatusRecord(statusRecord === 'run' ? 'pause' : 'run');
      e.preventDefault();
    },
    SPACE_CTRL: (e: any) => {
      setStatusRecord('stop');
      e.preventDefault();
    },
  };

  return (
    <div className='control__recordig'>
      <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges={true} />
      <button
        title={statusRecord === 'run' ? 'Стоп' : 'Старт'}
        className='control__button play btn'
        onClick={() => {
          const status = statusRecord === 'run' ? 'pause' : 'run';
          setStatusRecord(status);
        }}
      >
        {statusRecord === 'run' ? (
          <i className='fas fa-pause' />
        ) : (
          <i className='bx bxs-circle' />
        )}
      </button>
      <button
        title='Отправить аудио'
        className='control__button stop btn'
        onClick={() => {
          setStatusRecord('stop');
        }}
      >
        <i className='fas fa-stop' />
      </button>
      <div className='control__transcr-button-container '>
        <button className='btn btn-primary'>Транскрибация</button>
      </div>
      <div
        className='empty-text control__hotkey'
        style={{ gridArea: 'hot-key-1' }}
      >
        Горячие клавиши:
      </div>
      <div className='control__hotkey' style={{ gridArea: 'hot-key-2' }}>
        пробел
      </div>
      <div className='control__hotkey' style={{ gridArea: 'hot-key-3' }}>
        CTRL + пробел
      </div>
      <div className='control__hotkey' style={{ gridArea: 'hot-key-4' }}>
        CTRL+T
      </div>
    </div>
  );
}

export default ControlerPlayerRecording;
