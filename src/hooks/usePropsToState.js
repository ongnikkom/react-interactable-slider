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

  const [state, setState] = useMergeState(internalProps);

  /**
   * Update props for our slider state
   */
  useLayoutEffect(() => {
    setState(props);
  }, [props]);

  return [state, setState];
}

export default usePropsToState;
