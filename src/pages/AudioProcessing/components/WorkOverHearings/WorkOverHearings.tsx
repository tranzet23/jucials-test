import { IWorkOverHearingsProps } from './WorkOverHearingsTypes';

const WorkOverHearings = ({ setType }: IWorkOverHearingsProps) => {
  const onClickButton = (type: string) => {
    return () => {
      setType(type);
    };
  };
  return (
    <div className='audio-control'>
      <button
        type='button'
        className='btn btn-success w-sm audio-control__button'
        onClick={onClickButton('recording')}
      >
        <i className='bx bx-play-circle pe-1' />
        Запись аудио
      </button>
      <button
        type='button'
        className='mx-2  btn btn-primary  w-sm audio-control__button'
        onClick={onClickButton('loading')}
      >
        <i className='bx bxs-cloud-upload font-size-16 pe-1' />
        Загрузить аудио
      </button>
    </div>
  );
};

export default WorkOverHearings;
