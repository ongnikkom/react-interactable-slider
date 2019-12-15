import React, { useMemo } from 'react';
import useAppContext from '../../context';
import { container, point } from './styles';

function SnapPointDebugger() {
  const {
    propsToState: [state],
  } = useAppContext();

  const { debug, snapPoints } = state;

  return useMemo(
    () =>
      debug &&
      snapPoints.length > 0 && (
        <div className={container}>
          {snapPoints.map(({ x }, i) => (
            <div className={point} key={i} style={{ left: x }} />
          ))}
        </div>
      ),
    [debug, snapPoints]
  );
}

export default SnapPointDebugger;
