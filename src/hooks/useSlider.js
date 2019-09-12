import React, { Children, useEffect } from 'react';
import useMergeState from './useMergeState';
import useLogger from './useLogger';

import SlidePort from '../components/SlidePort';

const internalProps = {
  currentSnapPoint: 0,
  responsive: true,
  sliderWidth: 800,
  slides: [],
  snapPoints: [],
  view: null
};

function useSlider(interactableRef, props) {
  let slidesRef = [];

  const [sliderState, setSliderState] = useMergeState({
    cellAlign: props.cellAlign,
    debug: props.debug,
    dragEnabled: props.dragEnabled,
    fullWidthPerSlide: props.fullWidthPerSlide,
    marginGapsPerSlide: props.marginGapsPerSlide,
    navigationType: props.navigationType,
    view: null,
    widthPerSlide: props.widthPerSlide,
    ...internalProps
  });

  const {
    cellAlign,
    debug,
    dragEnabled,
    fullWidthPerSlide,
    marginGapsPerSlide,
    navigationType,
    slides,
    widthPerSlide
  } = sliderState;

  /**
   * Slider State logger
   */
  useEffect(() => {
    if (debug) useLogger(sliderState, 'Slider State');
  }, [
    cellAlign,
    debug,
    dragEnabled,
    fullWidthPerSlide,
    marginGapsPerSlide,
    navigationType,
    slides,
    widthPerSlide
  ]);

  /**
   * Set view
   */
  useEffect(() => {
    setSliderState({ view: interactableRef });
  }, []);

  /**
   * Set initial slides
   */
  useEffect(() => {
    setSliderState({ slides: slidesRef });
  }, [props.children]);

  /**
   * https://github.com/facebook/react/issues/8873
   */
  function render(children) {
    return Children.map(children, (child, i) => {
      return React.cloneElement(<SlidePort>{child}</SlidePort>, {
        ref: node => {
          if (!node) return;
          if (i < 1) slidesRef = [];
          slidesRef = [...slidesRef, node];
          const { ref } = child;
          if (typeof ref === 'function') {
            ref(node);
          }
        }
      });
    });
  }

  return [sliderState, setSliderState, render];
}

export default useSlider;
