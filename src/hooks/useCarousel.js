import React, { Children, useEffect } from 'react';
import useMergeState from './useMergeState';
import useLogger from './useLogger';

import SlidePort from '../components/SlidePort';

const internalProps = {
  carouselWidth: 800,
  currentSnapPoint: 0,
  overflowHidden: false,
  responsive: true,
  slides: [],
  snapPoints: [],
  view: null
};

function useCarousel(interactableRef, props) {
  let slidesRef = [];

  const [carouselState, setCarouselState] = useMergeState({
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
  } = carouselState;

  /**
   * Carousel State logger
   */
  useEffect(() => {
    if (debug) useLogger(carouselState, 'Carousel State');
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
    setCarouselState({ view: interactableRef });
  }, []);

  /**
   * Set initial slides
   */
  useEffect(() => {
    setCarouselState({ slides: slidesRef });
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

  return [carouselState, setCarouselState, render];
}

export default useCarousel;
