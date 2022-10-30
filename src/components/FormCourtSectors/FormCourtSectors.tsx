import React, { useEffect, useRef, useState } from 'react';
import { Collapse } from 'reactstrap';
import {
  AvCheckboxGroup,
  AvCheckbox,
} from 'availity-reactstrap-validation-safe';
import { IFormCourtSectors } from './FormCourtSectorsTypes';

interface IJudicialSector {
  district_id: string;
  address: string;
  classification_code: string;
  district: string;
  judge: string;
}

export default function FormCourtSectors({
  areas,
  handleChange,
  listJudicialSectors,
}: IFormCourtSectors) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSectors, setSelectedSectors] = useState<IJudicialSector[]>([]);
  const Modal = useRef(null);

  function closeCollapse(e) {
    // @ts-ignore
    if (Modal.current && !Modal.current.contains(e.target)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    if (!isOpen) {
      let selectedValues = listJudicialSectors.filter(
        item => areas.indexOf(item.district_id) !== -1,
      );
      setSelectedSectors(selectedValues);
    }
  }, [isOpen, areas, listJudicialSectors]);

  useEffect(() => {
    if (isOpen && Modal.current) {
      window.addEventListener('click', closeCollapse);
    } else {
      window.removeEventListener('click', closeCollapse);
    }

    return () => window.removeEventListener('click', closeCollapse);
  }, [isOpen]);

  if (!listJudicialSectors) return null;
  return (
    <div className='court-sectors-form-wrapp' ref={Modal}>
      <div className='court-sectors-btn-selected-wrap'>
        <div className='court-sectors-btn-only-wrap'>
          <button
            type='button'
            onClick={() => setIsOpen(prev => !prev)}
            className='form-select court-sectors__select'
          >
            Открыть список
          </button>
          {isOpen && (
            <Collapse isOpen={isOpen} className='court-sectors__menu-outer'>
              <AvCheckboxGroup
                className='court-sectors__menu card-body'
                role='group'
                name='area_id'
                aria-labelledby='checkbox-group'
                errorMessage='Необходимо выбрать поле'
                onChange={handleChange}
                value={areas}
                required
              >
                {listJudicialSectors.map(item => (
                  <div className='form-check-item' key={item.district_id}>
                    <AvCheckbox
                      label={`Судебный участок № ${item.district_id}`}
                      value={item.district_id}
                    />
                  </div>
                ))}
              </AvCheckboxGroup>
            </Collapse>
          )}
        </div>
        <div className='court-sectors-selected-show-wrapper'>
          Выбраны судебные участки:
          {selectedSectors.length > 0 &&
            selectedSectors.map(item => (
              <div
                className='courtsectors-form-span-selected-sectors'
                key={item.classification_code}
              >
                Судебный участок №{item.district_id}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
