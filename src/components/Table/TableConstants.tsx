export const defaultSorted = [
  {
    dataField: 'id',
    order: 'asc',
  },
];

const customTotal = (from: number, to: number, size: number) => (
  <span className='react-bootstrap-table-pagination-total'>
    Показано {from} с {to} по {size} результатов
  </span>
);

export const getOptions = (totalLen: number) => {
  return {
    paginationSize: 10,
    pageStartIndex: 1,
    nextPageText: 'Далее',
    prePageText: 'Назад',
    alwaysShowAllBtns: true,
    withFirstAndLast: false,
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: '10',
        value: 10,
      },
      {
        text: '50',
        value: 50,
      },
      {
        text: '100',
        value: 100,
      },
      {
        text: 'Все',
        value: totalLen,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };
};
