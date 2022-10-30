import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody, Button, Table } from 'reactstrap';
import { RootState } from 'store/reducers';
import {
  loadJudicialSectors,
  deleteJudicialSector,
  addJudicialSector,
  updateJudicialSector,
} from 'store/actions';
import { Breadcrumbs } from 'components';
import { IJudicialSectorsPage } from './JudicialSectorsTypes';
import {
  AddJudicialSectorPopupContent,
  DeleteJudicialSectorPopupContent,
  EditJudicialSectorPopupContent,
} from './JudicialSectorsContent';

const JudicialSectorsPage = ({
  loadJudicialSectors,
  deleteJudicialSector,
  addJudicialSector,
  updateJudicialSector,
  listJudicialSectors,
}: IJudicialSectorsPage) => {
  useEffect(() => {
    loadJudicialSectors(false);
  }, [loadJudicialSectors]);

  const [isPopup, setIsPopup] = useState(0);

  const popupHandler = condition => {
    setIsPopup(condition);
  };

  const [currentItem, setCurrentItem] = useState({});
  const [itemId, setItemId] = useState({
    districtId: 0,
    id: 0,
  });

  const findSectorsItem = (id: number) => {
    let currentItem = listJudicialSectors.find(item => item.district_id === id);
    return currentItem;
  };

  const editPopUpHandler = id => {
    const item: any = findSectorsItem(id);

    setCurrentItem(item);

    setIsPopup(2);
  };

  const deletePopUpHandlerOpen = (districtId, id) => {
    setItemId({ districtId, id });
    setIsPopup(3);
  };

  return (
    <>
      <Breadcrumbs
        title='Судебные участки'
        breadcrumbItems={['Судебные участки', 'Список']}
      />
      <Row>
        <Col xs='12'>
          <Card>
            <CardBody>
              <div className='container-fluid'>
                <div className='row'>
                  <Table className='table align-middle JudicialSector__list_table'>
                    <thead>
                      <tr className='JudicialSector__table_header'>
                        <th>№</th>
                        <th>Район</th>
                        <th>Адрес</th>
                        <th>Классификационный код</th>
                        <th>Судья</th>
                        <th className='JudicialSector__list_header_btn_wrap table__header-button-wrapper'>
                          <button
                            onClick={() => popupHandler(1)}
                            className='btn btn-primary court__sectors_button'
                          >
                            Добавить судебный участок
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {listJudicialSectors.map(sector => (
                        <tr
                          className='JudicialSector__list_item'
                          key={sector.district_id}
                        >
                          <td>
                            <div className='list_court_sectors_item_id'>
                              {sector.district_id}
                            </div>
                          </td>
                          <td>{sector.address}</td>
                          <td>{sector.district}</td>
                          <td>{sector.classification_code}</td>
                          <td>{sector.judge}</td>
                          <td>
                            <div className='d-flex justify-between align-items-center JudicialSector__list_item_btn_wrap buttons-container'>
                              <Button
                                color='primary'
                                outline
                                className='bg_transparent text-blue-400 w-lg'
                                onClick={() =>
                                  editPopUpHandler(sector.district_id)
                                }
                              >
                                Редактировать
                              </Button>
                              <Button
                                color='secondary'
                                outline
                                className='bg_transparent w-lg'
                                onClick={() =>
                                  deletePopUpHandlerOpen(
                                    sector.district_id,
                                    sector.id,
                                  )
                                }
                              >
                                Удалить
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
              <AddJudicialSectorPopupContent
                dispatch={addJudicialSector}
                popupHandler={popupHandler}
                isOpen={isPopup === 1}
              />
              <EditJudicialSectorPopupContent
                item={currentItem}
                dispatch={updateJudicialSector}
                popupHandler={popupHandler}
                isOpen={isPopup === 2}
              />
              <DeleteJudicialSectorPopupContent
                item={itemId}
                dispatch={deleteJudicialSector}
                popupHandler={popupHandler}
                isOpen={isPopup === 3}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

const mapStatetoProps = (state: RootState) => {
  const { listJudicialSectors } = state.JudicialSectors;
  return { listJudicialSectors };
};

export default connect(mapStatetoProps, {
  loadJudicialSectors,
  deleteJudicialSector,
  addJudicialSector,
  updateJudicialSector,
})(JudicialSectorsPage);
