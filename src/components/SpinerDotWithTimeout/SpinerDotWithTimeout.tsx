import { Spinner } from 'reactstrap';
import { useState, useEffect } from 'react';

const SpinerDotWithTimeout = ({ sleep }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer1 = setTimeout(() => setShow(true), sleep);
    return () => {
      clearTimeout(timer1);
    };
  }, [sleep, setShow]);

  return <>{show && <Spinner type='grow' color='dark' className='mx-1' />}</>;
};
export default SpinerDotWithTimeout;
