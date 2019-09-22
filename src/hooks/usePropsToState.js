import { useLayoutEffect } from 'react';
import useMergeState from './useMergeState';

const internalProps = {
  currentSnapPoint: 0,
  responsive: true,
  sliderWidth: false,
  slides: [],
  snapPoints: [],
  view: null
};

function usePropsToState(props) {
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
