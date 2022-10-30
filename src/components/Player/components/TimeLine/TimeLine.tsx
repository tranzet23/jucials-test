import { useState, useEffect } from 'react';
import { ITimeLineProps } from './TimeLineTypes';
//player.getDuration()
export default function TimeLine({ duration, playerType }: ITimeLineProps) {
  const [timeLine, setTimeLine] = useState<any[]>([]);

  useEffect(() => {
    if (duration) {
      const timeLineInterval = duration / 60 / 10;

      let res: number[] = [];
      let iter = 1;
      for (let i = 1; i <= 10; i++) {
        res.push(iter);
        iter += timeLineInterval;
        continue;
      }

      setTimeLine(res);
    }
  }, [duration]);

  return (
    <div className='timeline__wrapper'>
      {playerType !== 'hide' &&
        timeLine.map((value, index) => (
          <div
            className='timeline__item timeline__item_active'
            key={`${value}_${index}`}
          >
            <span>{value.toFixed(2)}</span>
            {index !== 9 && (
              <div className='d-flex justify-content-between'>
                <div className='timeline__item' />
                <div className='timeline__item' />
                <div className='timeline__item' />
                <div className='timeline__item' />
                <div className='timeline__item' />
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
