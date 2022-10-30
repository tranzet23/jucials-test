import { connect } from 'react-redux';
import { RootState } from 'store/reducers';
import { Table } from 'components';
import { columnsTable } from './PanelHearingColumns';
import { IPanelHearingProps } from './PanelHearingTypes';

const TableHearings = ({ listHearings }: IPanelHearingProps) => {
  if (!listHearings) return null;

  return <Table data={listHearings} columns={columnsTable} keyField='id' />;
};

const mapStatetoProps = (state: RootState) => {
  const { listHearings } = state.JudicialHearing;
  return { listHearings };
};

export default connect(mapStatetoProps, {})(TableHearings);
