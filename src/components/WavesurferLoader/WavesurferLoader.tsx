import { Spinner } from 'reactstrap';
// import { TextEditor } from 'components';

export default function WavesurferLoader({ message }) {
  return (
    <div className='audio-loader__container'>
      <p>{message}</p>
      <Spinner size='sm' style={{ width: '0.625rem', height: '0.625rem' }} />
    </div>
  );
}
