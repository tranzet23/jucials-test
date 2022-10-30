import waveform from 'assets/gifs/waveform.gif';
import { IPlayerRecordingProps } from './PlayerRecordingTypes';

function PlayerRecording({
  statusRecord,
  setStatusRecord,
}: IPlayerRecordingProps) {
  return (
    <div className={`player-recording ${statusRecord}`}>
      {(statusRecord === 'none' || statusRecord === 'needLoad') && (
        <div onClick={() => setStatusRecord('run')} className='d-flex'>
          <span className='player-recording-time align-self-end'>00:00</span>
          <i className='bx bxs-circle align-self-center' />
          <span className='player-recording-status'>НАЧАТЬ ЗАПИСЬ</span>
        </div>
      )}
      {statusRecord === 'run' && (
        <>
          <img className='player-gif' src={waveform} alt='запись...' />
          <div className='d-flex d-flex align-middle'>
            <i className='bx bxs-circle d-flex align-items-center' />
            <span className='player-recording-status'>ИДЕТ ЗАПИСЬ</span>
          </div>
        </>
      )}
      {statusRecord === 'pause' && (
        <>
          <div className='player-image' />
          <div className='d-flex align-items-center'>
            <i className='fas fa-stop' />
            <span className='player-recording-status'>
              ЗАПИСЬ ПРИОСТАНОВЛЕНА
            </span>
          </div>
        </>
      )}
      {statusRecord === 'stop' && (
        <>
          <div className='player-image' />
          <div className='d-flex align-items-center'>
            <i className='fas fa-stop' />
            <span className='player-recording-status'>ЗАПИСЬ В ОБРАБОТКЕ</span>
          </div>
        </>
      )}
    </div>
  );
}
export default PlayerRecording;
