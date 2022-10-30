import React, {useState} from "react";
import {Dropdown, DropdownMenu, DropdownToggle, DropdownItem, Badge} from "reactstrap";
import {VALUE_RESULT_JUDICIAL_HEARINGS} from "../PanelHearing/PanelHearingConstants";
import {
  IHearingStatusDropdown
} from "pages/JudicialHearings/components/HearingStatusDropdown/HearingStatusDropdownTypes";
import {setSelectedJudicialHearingId, updateHearingStatus} from "store/judicialHearing/actions";
import {connect} from "react-redux";

function HearingStatusDropdown({children, hearingInfo, updateHearingStatus, setSelectedJudicialHearingId} : IHearingStatusDropdown) {
  const [isOpen, setIsOpen] = useState(false)

  function toggleModal() {
    setIsOpen(prev => !prev)
  }

  function handleStatusChange(changeStatus) {
    if (hearingInfo.id) {
      setSelectedJudicialHearingId(hearingInfo.id)
      updateHearingStatus(changeStatus)
    }
  }

  return (
    <Dropdown
      isOpen={isOpen}
      toggle={toggleModal}
      className='hearing__status-dropdown'
      onChange={handleStatusChange}
    >
        <DropdownToggle
          tag='span'
          className='hearing__status-dropdown-button d-flex align-items-center gap-2'
          style={{cursor: "pointer"}}
        >
          {children}
        </DropdownToggle>
      <DropdownMenu>
        {Object.entries(VALUE_RESULT_JUDICIAL_HEARINGS).map(([key, value], index) => (
          <div key={index}>
            <DropdownItem onClick={() => {handleStatusChange(key)}}>
              <Badge
                className={`rounded-pill badge-soft-${key} bg-${key} ms-1 px-2`}
              >
                {value}
              </Badge>
            </DropdownItem>
            {index !== Object.keys(VALUE_RESULT_JUDICIAL_HEARINGS).length - 1 && <DropdownItem divider/>}
          </div>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default connect(null, {
  setSelectedJudicialHearingId,
  updateHearingStatus,
})(HearingStatusDropdown);