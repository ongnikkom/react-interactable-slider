import { useState } from 'react';

function useMergeState(initialState) {
  const [state, setState] = useState(initialState);
  const setMergedState = newState => setState(prevState => Object.assign({}, prevState, newState));
  return [state, setMergedState];
}

export default useMergeState;
