import { useEffect } from 'react';
import Circle from '@uiw/react-color-circle';
import { ColorResult } from '@uiw/color-convert';
import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { IPanelColorProps } from './PanelColorTypes';
import { DEFAULT_COLORS } from '../../constants/app_сonstants';

const PanelColor = (props: IPanelColorProps) => {
  const { selectedColor, changeColor } = props;
  const defColor = selectedColor || DEFAULT_COLORS[0];

  useEffect(() => {
    if (!selectedColor) {
      changeColor(defColor);
    }
  }, [changeColor, defColor, selectedColor]);

  return (
    <div className='panel-colors'>
      <UncontrolledDropdown>
        <DropdownToggle href='#' className='card-drop' tag='i'>
          <div
            className='panel-colors-indicator'
            style={{ background: defColor }}
          />
        </DropdownToggle>
        <DropdownMenu>
          <div className='panel-colors-list'>
            <Circle
              colors={DEFAULT_COLORS}
              color={defColor}
              onChange={(color: ColorResult) => {
                changeColor(color.hex);
              }}
            />
          </div>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default PanelColor;
