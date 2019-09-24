import React, { useCallback, useEffect, useState } from 'react';
import { container, formGroup } from './styles';

import useId from '../../hooks/useId';

import RadioGroup from '../RadioGroup';
import RadioOption from '../RadioOption';

function onChange(handler, key, isBoolean = false) {
  return function({ target: { value } }) {
    if (isBoolean) {
      handler({ [key]: value === 'true' });
    } else {
      handler({ [key]: value });
    }
  };
}

function Debugger({ slider }) {
  const [config, setConfig] = slider;

  const {
    cellAlign,
    debug,
    dragEnabled,
    fullWidthPerSlide,
    marginGapsPerSlide,
    navigationType,
    widthPerSlide
  } = config;

  const [formNamePrefix, setFormNamePrefix] = useState();

  useEffect(() => {
    setFormNamePrefix(useId('slider'));
  }, []);

  const onChangeMarginGaps = useCallback(
    ({ target: { value } }) => {
      const val = parseInt(value);
      setConfig({ marginGapsPerSlide: val });
    },
    [widthPerSlide, marginGapsPerSlide]
  );

  const onChangeWidthPerSlide = useCallback(
    ({ target: { value } }) => {
      const val = parseInt(value);
      setConfig({ widthPerSlide: val });
    },
    [widthPerSlide, marginGapsPerSlide]
  );

  return (
    <div className={container}>
      <h1>Playground</h1>

      <div className={formGroup}>
        <p>Debug</p>
        <RadioGroup
          name={`${formNamePrefix}-debug`}
          value={debug.toString()}
          onChange={onChange(setConfig, 'debug', true)}
        >
          <RadioOption label="True" value="true" />
          <RadioOption label="False" value="false" />
        </RadioGroup>
      </div>

      <div className={formGroup}>
        <p>Cell Align</p>
        <RadioGroup
          name={`${formNamePrefix}-cell-align`}
          value={cellAlign}
          onChange={onChange(setConfig, 'cellAlign')}
        >
          <RadioOption label="Left" value="left" />
          <RadioOption label="Right" value="right" />
        </RadioGroup>
      </div>

      <div className={formGroup}>
        <p>Set navigation type</p>
        <RadioGroup
          name={`${formNamePrefix}-nav-type`}
          value={navigationType}
          onChange={onChange(setConfig, 'navigationType')}
        >
          <RadioOption label="Arrows" value="arrows" />
          &nbsp;&nbsp;
          <RadioOption label="Both" value="both" />
          &nbsp;&nbsp;
          <RadioOption label="Dots" value="dots" />
          <RadioOption label="None" value="none" />
        </RadioGroup>
      </div>

      <div className={formGroup}>
        <p>Draggable</p>
        <RadioGroup
          name={`${formNamePrefix}-draggable`}
          value={dragEnabled.toString()}
          onChange={onChange(setConfig, 'dragEnabled', true)}
        >
          <RadioOption label="True" value="true" />
          <RadioOption label="False" value="false" />
        </RadioGroup>
      </div>

      <div className={formGroup}>
        <p>Is full width per slide?</p>
        <RadioGroup
          name={`${formNamePrefix}-full-width-per-slide`}
          value={fullWidthPerSlide.toString()}
          onChange={onChange(setConfig, 'fullWidthPerSlide', true)}
        >
          <RadioOption label="True" value="true" />
          <RadioOption label="False" value="false" />
        </RadioGroup>
      </div>

      <div className={formGroup}>
        <p>
          Margin gaps per slide <br />
          <small>
            <i>Ignored if full width is set to True</i>
          </small>
        </p>
        <input
          type="number"
          name={`${formNamePrefix}-margin-gaps-per-slide`}
          value={marginGapsPerSlide}
          onChange={onChangeMarginGaps}
        />
      </div>

      <div className={formGroup}>
        <p>
          Width per slide
          <br />
          <small>
            <i>Ignored if full width per slide is set to True</i>
          </small>
        </p>
        <input
          type="number"
          name={`${formNamePrefix}-width-per-slide`}
          value={widthPerSlide}
          onChange={onChangeWidthPerSlide}
        />
      </div>
    </div>
  );
}

export default Debugger;
