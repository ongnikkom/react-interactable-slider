import React, { useCallback, useRef } from 'react';
import { useDidMount } from 'react-hooks-lib';
import PropTypes from 'prop-types';

/**
 * Context
 */
import { Provider } from './context';

/**
 * Main 3rd party library
 */
import Interactable from 'react-interactable/noNative';

/**
 * Custom Hooks
 */
import usePropsToState from './hooks/usePropsToState';
import useSlider from './hooks/useSlider';

/**
 * Components
 */
import Container from './components/Container';
import SnapPointDebugger from './components/SnapPointDebugger';

/**
 * Our plugin propTypes
 */
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

/**
 * Default props for our plugin's config
 */
ReactInteractableSlider.defaultProps = {
  cellAlign: 'left',
  customArrows: null,
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
  const [state, setState] = usePropsToState(props);

  const { dragEnabled, snapPoints } = state;

  useDidMount(() => {
    setState({ view: interactableRef });
  });

  const [render] = useSlider([state, setState]);

  /**
   * Identify our current snap point so we can build
   * a navigation for the slider.
   */
  const onSnap = useCallback(({ index }) => setState({ currentSnapPoint: index }), []);

  const onDrag = useCallback(e => {
    setState({ isPannedHorizontally: e.state === 'start' });
  });

  /**
   * Create an object for our propsToState and userProps
   * so we can able to check difference easily
   */
  const providerValue = {
    propsToState: [state, setState],
    userProps: props
  };

  return (
    <Provider value={providerValue}>
      <Container>
        <Interactable.View
          animatedNativeDriver
          horizontalOnly
          dragEnabled={dragEnabled}
          onDrag={onDrag}
          onSnap={onSnap}
          ref={interactableRef}
          snapPoints={snapPoints}
        >
          {render}
        </Interactable.View>
        <SnapPointDebugger />
      </Container>
    </Provider>
  );
}

export default ReactInteractableSlider;
