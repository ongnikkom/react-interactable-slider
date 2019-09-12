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
import useSlider from './hooks/useSlider';
import useSlides from './hooks/useSlides';

/**
 * Components
 */
import Container from './components/Container';
import SnapPointDebugger from './components/SnapPointDebugger';
import Debugger from './components/Debugger';

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
  const [sliderState, setSliderState, render] = useSlider(interactableRef, props, children);

  // Get needed state here
  const { dragEnabled, snapPoints } = sliderState;

  // Do calculation for slides
  useSlides(sliderState, setSliderState);

  const onSnap = useCallback(
    snapPoint => setSliderState({ currentSnapPoint: snapPoint.index }),
    []
  );

  return (
    <>
      <Container {...{ ...sliderState, setSliderState }}>
        <Interactable.View
          horizontalOnly
          dragEnabled={dragEnabled}
          ref={interactableRef}
          snapPoints={snapPoints}
          onSnap={onSnap}
        >
          {render(children)}
        </Interactable.View>
        <SnapPointDebugger {...{ ...sliderState }} />
      </Container>
      <Debugger {...{ ...sliderState, setSliderState }} />
    </>
  );
}

export default ReactInteractableSlider;
