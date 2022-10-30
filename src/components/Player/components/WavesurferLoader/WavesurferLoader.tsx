import {Spinner} from "reactstrap";

export default function WavesurferLoader() {
  return (
    <div className='audio-loader__container'>
      <p>Аудиофайл загружается... </p>
      <Spinner size='sm' style={{ width: '0.625rem', height: '0.625rem' }} />
    </div>
  )
}