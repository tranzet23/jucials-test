import { useState } from 'react';
import { Progress } from 'reactstrap';
import { IProgressBarProps } from './ProgressBarTypes';

const ProgressBar = (props: IProgressBarProps) => {
  const [style, setStyle] = useState({});
  const [done, setDone] = useState(0);

  if (done > 100) return null;

  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: `${done}%`,
    };

    setStyle(newStyle);
    setDone(done => done + 5);
  }, 2000);

  return (
    <Progress value={done} color='primary' style={style} animated></Progress>
  );
};

export default ProgressBar;
