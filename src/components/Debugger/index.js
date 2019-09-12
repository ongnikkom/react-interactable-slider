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

function onChangeNumber(handler, key) {
  return function({ target: { value } }) {
    const val = parseInt(value);
    if (!isNaN(val) && val > -1) handler({ [key]: value });
  };
}

function Debugger({
  cellAlign,
  debug,
  dragEnabled,
  fullWidthPerSlide,
  marginGapsPerSlide,
  navigationType,
  responsive,
  sliderWidth,
  snapPoints,
  widthPerSlide,
  setSliderState
}) {
  if (!debug) return null;

  const [formNamePrefix, setFormNamePrefix] = useState();

  useEffect(() => {
    setFormNamePrefix(useId('slider'));
  }, []);

  const onChangeMarginGaps = useCallback(
    ({ target: { value } }) => {
      const val = parseInt(value);
      const totalWidth = val + widthPerSlide;

      if (totalWidth <= sliderWidth) {
        setSliderState({ marginGapsPerSlide: val });
      } else {
        setSliderState({ marginGapsPerSlide: sliderWidth - widthPerSlide });
      }
    },
    [widthPerSlide, marginGapsPerSlide]
  );

  const onChangeWidthPerSlide = useCallback(
    ({ target: { value } }) => {
      const val = parseInt(value);

      if (val <= sliderWidth) {
        setSliderState({ widthPerSlide: val });
      } else {
        setSliderState({ marginGapsPerSlide: 0, widthPerSlide: sliderWidth });
      }
    },
    [widthPerSlide, marginGapsPerSlide]
  );

  return (
    <div className={container}>
      <h1>Debugger</h1>

      <div className={formGroup}>
        <p>Cell Align</p>
        <RadioGroup
          name={`${formNamePrefix}-cell-align`}
          value={cellAlign}
          onChange={onChange(setSliderState, 'cellAlign')}
        >
          <RadioOption label="Left" value="left" />
          <RadioOption label="Right" value="right" />
        </RadioGroup>
      </div>

      {snapPoints.length > 0 && (
        <div className={formGroup}>
          <p>Set navigation type</p>
          <RadioGroup
            name={`${formNamePrefix}-nav-type`}
            value={navigationType}
            onChange={onChange(setSliderState, 'navigationType')}
          >
            <RadioOption label="Arrows" value="arrows" />
            &nbsp;&nbsp;
            <RadioOption label="Both" value="both" />
            &nbsp;&nbsp;
            <RadioOption label="Dots" value="dots" />
            <RadioOption label="None" value="none" />
          </RadioGroup>
        </div>
      )}

      <div className={formGroup}>
        <p>Draggable</p>
        <RadioGroup
          name={`${formNamePrefix}-draggable`}
          value={dragEnabled.toString()}
          onChange={onChange(setSliderState, 'dragEnabled', true)}
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
          onChange={onChange(setSliderState, 'fullWidthPerSlide', true)}
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
          disabled={fullWidthPerSlide || widthPerSlide === sliderWidth}
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
          value={widthPerSlide <= sliderWidth ? widthPerSlide : sliderWidth}
          onChange={onChangeWidthPerSlide}
          disabled={fullWidthPerSlide}
        />
      </div>

      <div className={formGroup}>
        <p>
          Slider Width <br />
          <small>
            <i>Ignored if you checked responsive slider width</i>
          </small>
        </p>
        <input
          type="number"
          name={`${formNamePrefix}-slider-width`}
          value={sliderWidth}
          onChange={onChangeNumber(setSliderState, 'sliderWidth')}
          disabled={responsive}
        />
      </div>

      <div className={formGroup}>
        <p>Responsive slider</p>
        <RadioGroup
          name={`${formNamePrefix}-responsive-slider`}
          value={responsive.toString()}
          onChange={onChange(setSliderState, 'responsive', true)}
        >
          <RadioOption label="True" value="true" />
          <RadioOption label="False" value="false" />
        </RadioGroup>
      </div>
    </div>
  );
}

export default Debugger;
