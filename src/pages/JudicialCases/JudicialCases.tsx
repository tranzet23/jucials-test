import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Row, Col, Button, Modal, ModalBody} from 'reactstrap';
import {loadJudicialCases} from 'store/actions';
import {RootState} from 'store/reducers';
import {Breadcrumbs, Table} from 'components';
import {columnsTable} from './components';
import {IJudicialCasesProps} from './JudicialCasesTypes';
import {getDateInFormat} from 'utils/app_helper';
import {judicialCasesRenderPeopleType} from './components/JudicialCasesTable/JudicialCasesTableColumns';
import CreateJudicialCase from "../../components/Modal/CreateCase/CreateJudicialCase";

const JudicialCases = ({areaId, loadJudicialCases, listJudicialCases,}: IJudicialCasesProps) => {
    const [listCasesSorted, setListCasesSorted] = useState(listJudicialCases);
    const [searchInput, setSearchInput] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        if (areaId) {
            loadJudicialCases(areaId);
        }
    }, [loadJudicialCases, areaId]);

    useEffect(() => {
        setListCasesSorted(listJudicialCases);
    }, [listJudicialCases]);
    useEffect(() => {
        if (searchInput === '') {
            return setListCasesSorted(listJudicialCases);
        }
        const sortedArray = listJudicialCases?.filter(
            item =>
                item.uid.toString().toLowerCase().indexOf(searchInput.toLowerCase()) !==
                -1 ||
                item.case_id
                    .toString()
                    .toLowerCase()
                    .indexOf(searchInput.toLowerCase()) !== -1 ||
                getDateInFormat(item.start)
                    .toString()
                    .toLowerCase()
                    .indexOf(searchInput.toLowerCase()) !== -1 ||
                getDateInFormat(item?.end)
                    .toString()
                    .toLowerCase()
                    .indexOf(searchInput.toLowerCase()) !== -1 ||
                judicialCasesRenderPeopleType(item?.plaintiff)
                    .toString()
                    .toLowerCase()
                    .indexOf(searchInput.toLowerCase()) !== -1 ||
                judicialCasesRenderPeopleType(item?.defendant)
                    .toString()
                    .toLowerCase()
                    .indexOf(searchInput.toLowerCase()) !== -1,
        );

        setListCasesSorted(sortedArray);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchInput, listJudicialCases]);

    const searchInputHandler = e => {
        setSearchInput(e.target.value);
    };

    const onCloseModal = () => {
        setShowCreateModal(false);
    };

    const onShowModal = () => {
        setShowCreateModal(true);
    };

    if (areaId === undefined) {
        return null;
    }

    return (
        <>
            <Breadcrumbs
                title='Дела судебного участка'
                breadcrumbItems={['Дела судебного участка', 'Создание']}
            />
            <Row>
                <Col xs='12'>
                    <div className='judicialcases-content-wrapper'>
                        <div className='judicialcases-header'>
                            <div className='judicialcases-header-search'>
                                <span className='me-2'>Поиск по делам : </span>
                                <input
                                    className='judicialcases-header-search-input'
                                    type='text'
                                    value={searchInput}
                                    onChange={searchInputHandler}
                                />
                            </div>
                            <Button
                                onClick={() => onShowModal()}
                                className='btn judicialcases-header__btn'
                                color='primary'
                                outline
                                style={{cursor: 'pointer'}}
                            >
                                Создать дело
                            </Button>
                        </div>
                        <CreateJudicialCase
                            closeModal={onCloseModal}
                            isOpen={showCreateModal}
                        />
                        <Table
                          data={listCasesSorted}
                          columns={columnsTable}
                          keyField='id'
                        />
                    </div>
                </Col>

            </Row>
        </>
    );
};
const mapStateToProps = (state: RootState) => {
    const {areaId} = state.Profile;
    const {listJudicialCases, currentItem} = state.JudicialCases;

    return {areaId, listJudicialCases, currentItem};
};

export default connect(mapStateToProps, {
    loadJudicialCases,
})(withRouter(JudicialCases));
