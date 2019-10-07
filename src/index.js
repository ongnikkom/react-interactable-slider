import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Contexts
 */
import { Provider } from './context';

/**
 * Main 3rd party plugin
 */
import Interactable from 'react-interactable/noNative';

/**
 * Hooks
 */
import usePreventDragOnTagNames from './hooks/usePreventDragOnTagNames';
import usePropsToState from './hooks/usePropsToState';
import useSlider from './hooks/useSlider';

/**
 * Components
 */
import Container from './components/Container';
import SnapPointDebugger from './components/SnapPointDebugger';

ReactInteractableSlider.propTypes = {
  cellAlign: PropTypes.oneOf(['left', 'right']),
  children: PropTypes.node.isRequired,
  customArrows: PropTypes.shape({
    left: PropTypes.element.isRequired,
    right: PropTypes.element.isRequired
  }),
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

  // Convert and setup state from props
  const propsToState = usePropsToState(props);

  // Build the slider
  const [render] = useSlider(propsToState, interactableRef);

  // Get required state for our Interactable.View
  const { dragEnabled, snapPoints } = propsToState[0];

  const onSnap = useCallback(
    snapPoint => propsToState[1]({ currentSnapPoint: snapPoint.index }),
    []
  );

  const onDrag = useCallback(e => {
    const x = Math.floor(Math.abs(e.x));
    if (e.state === 'end' && x > 0) propsToState[1]({ dragEnabled: true, scrollable: true });
  }, []);

  usePreventDragOnTagNames(['a', 'img']);

  return (
    <Provider value={propsToState}>
      <Container>
        <Interactable.View
          horizontalOnly
          dragEnabled={dragEnabled}
          ref={interactableRef}
          snapPoints={snapPoints}
          onSnap={onSnap}
          onDrag={onDrag}
        >
          {render(children)}
        </Interactable.View>
        <SnapPointDebugger />
      </Container>
    </Provider>
  );
}

export default ReactInteractableSlider;
