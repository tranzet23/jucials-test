import {
  keyMap,
  SOUND_SPEED_MAX,
  SOUND_SPEED_MIN,
  SOUND_SPEED_STEP,
  VOLUME_MAX,
  VOLUME_STEP,
} from 'constants/sound_controls';
import { configure, GlobalHotKeys } from 'react-hotkeys';
import React, { useState } from 'react';
import { IHotkeysProps } from './HotkeysTypes';

// Функционал ограничителей громкости и скорости воспроизведеня
function ceilingRestriction(
  setState: React.Dispatch<React.SetStateAction<number>>,
  step: number,
  max: number,
  restrictionCb?: () => void,
) {
  return setState(prev => {
    if (prev + step < max) {
      return prev + step;
    } else {
      if (restrictionCb) {
        restrictionCb();
      }
      return max;
    }
  });
}

function floorRestriction(
  setState: React.Dispatch<React.SetStateAction<number>>,
  step: number,
  min: number,
  restrictionCb?: () => void,
) {
  return setState(prev => {
    // Проверка на минимальную громкость
    if (prev - step > min) {
      return prev - step;
    } else {
      if (restrictionCb) {
        restrictionCb();
      }
      return min;
    }
  });
}

export default function Hotkeys({
  setIsPlaying,
  setVolume,
  setSoundSpeed,
  rewindForward,
  rewindBackward,
  isPlayerReady,
}: IHotkeysProps) {
  const [volumeHotKey, setVolumeHotKey] = useState(0.5);
  const [soundSpeedHotKey, setSoundSpeedHotKey] = useState(1.0);

  configure({
    ignoreRepeatedEventsWhenKeyHeldDown: false,
    // Для работы пробела как горячей клавиши
    customKeyCodes: {
      32: 'SPACE_BAR',
    },
    // Для работы клавиш в импутах
    ignoreTags: [],
    // Если при фокусе в редакторе зажать ctrl пропускает горячие клавиши
    ignoreEventsCondition: e => {
      let isBanningKeys = false;
      const panelInformation: any = document.getElementById(
        'panel_information_meeting',
      );
      if (panelInformation) {
        isBanningKeys =
          panelInformation.style.visibility === 'visible' ? true : false;
      }

      if (
        document.activeElement &&
        (document.activeElement.classList.contains('ck-editor__editable') ||
          document.activeElement.classList.contains('ck-widget') ||
          isBanningKeys)
      ) {
        if (e.ctrlKey) {
          console.log('ctrl + hotkey');
          return false;
        }
        return true;
      } else {
        return false;
      }
    },
  });

  const handlers = {
    // Плей / пауза
    SPACE: e => {
      setIsPlaying(prev => !prev);
      e.preventDefault();
    },
    SPACE_CTRL: e => {
      setIsPlaying(prev => !prev);
      e.preventDefault();
    },
    // Увеличение громкости
    KEY_UP: e => {
      ceilingRestriction(setVolumeHotKey, VOLUME_STEP, VOLUME_MAX);
      setVolumeHotKey(volume => {
        setVolume(volume || volumeHotKey);
        return volume;
      });
      e.preventDefault();
    },
    // Уменьшение громкости
    KEY_DOWN: e => {
      floorRestriction(setVolumeHotKey, VOLUME_STEP, 0);
      setVolumeHotKey(volume => {
        setVolume(volume);
        return volume;
      });

      e.preventDefault();
    },
    // Замедление
    COMMAND_LEFT: e => {
      floorRestriction(setSoundSpeedHotKey, SOUND_SPEED_STEP, SOUND_SPEED_MIN);
      setSoundSpeedHotKey(speed => {
        setSoundSpeed(speed || soundSpeedHotKey);
        return speed;
      });

      e.preventDefault();
    },
    // Ускорение
    COMMAND_RIGHT: e => {
      ceilingRestriction(
        setSoundSpeedHotKey,
        SOUND_SPEED_STEP,
        SOUND_SPEED_MAX,
      );
      setSoundSpeedHotKey(speed => {
        setSoundSpeed(speed);
        return speed;
      });

      e.preventDefault();
    },
    // Перемотка вперёд
    RIGHT: e => {
      rewindForward();
      e.preventDefault();
    },
    // Перемотка назад
    LEFT: e => {
      rewindBackward();
      e.preventDefault();
    },
  };

  return isPlayerReady ? <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges={true} /> : null;
}
