import { UncontrolledTooltip } from 'reactstrap';
import { IDotsTooltipProps } from './DotsTooltipTypes';

const DotsTooltip = (props: IDotsTooltipProps) => {
  const { idTarget } = props;

  return (
    <>
      <i className='mdi mdi-dots-horizontal font-size-18' id={idTarget} />
      <UncontrolledTooltip placement='left' target={idTarget} className='text-'>
        {props.children}
      </UncontrolledTooltip>
    </>
  );
};

export default DotsTooltip;
