const customTotal = (from, to, size) => (
  <span className='react-bootstrap-table-pagination-total'>
    Показано {from} до {to} из {size} ролей
  </span>
);

export const pageOptions = {
  sizePerPage: 5,
  showTotal: true,
  custom: true,
  paginationTotalRenderer: customTotal,
};
