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

function CarouselDebugger({
  carouselWidth,
  cellAlign,
  debug,
  dragEnabled,
  fullWidthPerSlide,
  marginGapsPerSlide,
  navigationType,
  overflowHidden,
  responsive,
  snapPoints,
  widthPerSlide,
  setCarouselState
}) {
  if (!debug) return null;

  const [formNamePrefix, setFormNamePrefix] = useState();

  useEffect(() => {
    setFormNamePrefix(useId('carousel'));
  }, []);

  const onChangeMarginGaps = useCallback(
    ({ target: { value } }) => {
      const val = parseInt(value);
      const totalWidth = val + widthPerSlide;

      if (totalWidth <= carouselWidth) {
        setCarouselState({ marginGapsPerSlide: val });
      } else {
        setCarouselState({ marginGapsPerSlide: carouselWidth - widthPerSlide });
      }
    },
    [widthPerSlide, marginGapsPerSlide]
  );

  const onChangeWidthPerSlide = useCallback(
    ({ target: { value } }) => {
      const val = parseInt(value);

      if (val <= carouselWidth) {
        setCarouselState({ widthPerSlide: val });
      } else {
        setCarouselState({ marginGapsPerSlide: 0, widthPerSlide: carouselWidth });
      }
    },
    [widthPerSlide, marginGapsPerSlide]
  );

  return (
    <div className={container}>
      <h1>Debugger</h1>

      <div className={formGroup}>
        <p>Overflow</p>
        <RadioGroup
          name={`${formNamePrefix}-overflow`}
          value={overflowHidden.toString()}
          onChange={onChange(setCarouselState, 'overflowHidden', true)}
        >
          <RadioOption label="Visible" value="true" />
          <RadioOption label="Hidden" value="false" />
        </RadioGroup>
      </div>

      <div className={formGroup}>
        <p>Cell Align</p>
        <RadioGroup
          name={`${formNamePrefix}-cell-align`}
          value={cellAlign}
          onChange={onChange(setCarouselState, 'cellAlign')}
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
            onChange={onChange(setCarouselState, 'navigationType')}
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
          onChange={onChange(setCarouselState, 'dragEnabled', true)}
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
          onChange={onChange(setCarouselState, 'fullWidthPerSlide', true)}
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
          disabled={fullWidthPerSlide || widthPerSlide === carouselWidth}
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
          value={widthPerSlide <= carouselWidth ? widthPerSlide : carouselWidth}
          onChange={onChangeWidthPerSlide}
          disabled={fullWidthPerSlide}
        />
      </div>

      <div className={formGroup}>
        <p>
          Carousel Width <br />
          <small>
            <i>Ignored if you checked responsive carousel width</i>
          </small>
        </p>
        <input
          type="number"
          name={`${formNamePrefix}-carousel-width`}
          value={carouselWidth}
          onChange={onChangeNumber(setCarouselState, 'carouselWidth')}
          disabled={responsive}
        />
      </div>

      <div className={formGroup}>
        <p>Responsive carousel</p>
        <RadioGroup
          name={`${formNamePrefix}-responsive-carousel`}
          value={responsive.toString()}
          onChange={onChange(setCarouselState, 'responsive', true)}
        >
          <RadioOption label="True" value="true" />
          <RadioOption label="False" value="false" />
        </RadioGroup>
      </div>
    </div>
  );
}

export default CarouselDebugger;
