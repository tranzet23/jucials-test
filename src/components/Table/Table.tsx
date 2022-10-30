import { Col, Row } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { getOptions, defaultSorted } from './TableConstants';
import { ITableProps } from './TableTypes';

const Table = (props: ITableProps) => {
  const { data, columns, keyField } = props;

  if (!data) return null;

  return (
    <ToolkitProvider keyField={keyField} columns={columns} data={data} search>
      {(toolkitProps: any) => (
        <Row>
          <Col xl='12'>
            <BootstrapTable
              keyField='id'
              responsive
              bordered={false}
              striped={false}
              defaultSorted={defaultSorted}
              rowClasses='courtcases-table-row'
              pagination={paginationFactory(getOptions(12))}
              classes={'table align-middle table-nowrap judicialcases-table'}
              headerWrapperClasses={'thead-light'}
              {...toolkitProps.baseProps}
            />
          </Col>
        </Row>
      )}
    </ToolkitProvider>
  );
};

export default Table;
