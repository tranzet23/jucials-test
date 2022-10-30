import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { setSelectedJudicialCaseId } from 'store/actions';
import { AUTH_PROTECTED_ROUTES } from 'navigation/index';

const JudicialСasesTableOpenBtn = ({ caseId, setSelectedJudicialCaseId }) => {
  const onButtonClick = (caseId: string) => {
    return () => {
      setSelectedJudicialCaseId(caseId);
    };
  };

  return (
    <div className='JudicialSectors-table-container'>
      <Link to={`${AUTH_PROTECTED_ROUTES.JUDICIAL_HEARINGS.pathTransition}`}>
        <Button
          className='judicialcases-editbtn table__button'
          color='primary'
          outline
          style={{ cursor: 'pointer' }}
          onClick={onButtonClick(caseId)}
        >
          Открыть дело
        </Button>
      </Link>
    </div>
  );
};

export default connect(() => ({}), {
  setSelectedJudicialCaseId,
})(JudicialСasesTableOpenBtn);
