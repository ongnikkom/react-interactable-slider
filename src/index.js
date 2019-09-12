import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Main 3rd party plugin
 */
import Interactable from 'react-interactable/noNative';

/**
 * Hooks
 */
import usePreventDragOnTagNames from './hooks/usePreventDragOnTagNames';
import useCarousel from './hooks/useCarousel';
import useSlides from './hooks/useSlides';

/**
 * Components
 */
import CarouselContainer from './components/CarouselContainer';
import CarouselSnapPointDebugger from './components/CarouselSnapPointDebugger';
import CarouselDebugger from './components/CarouselDebugger';

ReactInteractableSlider.propTypes = {
  cellAlign: PropTypes.oneOf(['left', 'right']),
  children: PropTypes.node.isRequired,
  dragEnabled: PropTypes.bool,
  debug: PropTypes.bool,
  fullWidthPerSlide: PropTypes.bool,
  marginGapsPerSlide: PropTypes.number,
  navigationType: PropTypes.oneOf(['arrows', 'both', 'dots', 'none']),
  widthPerSlide: PropTypes.number
};

ReactInteractableSlider.defaultProps = {
  cellAlign: 'left',
  dragEnabled: true,
  debug: false,
  fullWidthPerSlide: false,
  marginGapsPerSlide: 4,
  navigationType: 'none',
  widthPerSlide: 200
};

function ReactInteractableSlider(props) {
  const { children } = props;
  if (!children) return null;

  const interactableRef = useRef();

  usePreventDragOnTagNames(['a', 'img']);

  // Convert and setup state from props
  const [carouselState, setCarouselState, render] = useCarousel(interactableRef, props, children);

  // Get needed state here
  const { dragEnabled, snapPoints } = carouselState;

  // Do calculation for slides
  useSlides(carouselState, setCarouselState);

  const onSnap = useCallback(
    snapPoint => setCarouselState({ currentSnapPoint: snapPoint.index }),
    []
  );

  return (
    <>
      <CarouselContainer {...{ ...carouselState, setCarouselState }}>
        <Interactable.View
          horizontalOnly
          dragEnabled={dragEnabled}
          ref={interactableRef}
          snapPoints={snapPoints}
          onSnap={onSnap}
        >
          {render(children)}
        </Interactable.View>
        <CarouselSnapPointDebugger {...{ ...carouselState }} />
      </CarouselContainer>
      <CarouselDebugger {...{ ...carouselState, setCarouselState }} />
    </>
  );
}

export default ReactInteractableSlider;
