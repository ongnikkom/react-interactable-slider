import { useLayoutEffect } from 'react';
import useMergeState from './useMergeState';

const internalProps = {
  currentSnapPoint: 0,
  isDragging: false,
  forceDragEnabled: false,
  responsive: true,
  sliderWidth: 800,
  slides: [],
  snapPoints: []
};

function usePropsToState(props) {
  internalProps.forceDragEnabled = props.dragEnabled;

  const combinedProps = {
    ...props,
    ...internalProps
  };

  // We don't need this on our state
  delete combinedProps.children;

  const [state, setState] = useMergeState(combinedProps);

  /**
   * Update props for our slider state
   */
  useLayoutEffect(() => {
    setState({ ...props });
  }, [props]);

  return [state, setState];
}

export default usePropsToState;
