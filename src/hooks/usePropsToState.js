import { useMergeState, useDidUpdate } from "react-hooks-lib";

const internalProps = {
  currentSnapPoint: 0,
  isDragging: false,
  responsive: true,
  slides: [],
  snapPoints: []
};

function usePropsToState(props) {
  const { state, set } = useMergeState({ ...props, ...internalProps });

  useDidUpdate(() => {
    set(props);
  }, [props]);

  return [state, set];
}

export default usePropsToState;
