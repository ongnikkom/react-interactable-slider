import React, { useContext, useMemo } from 'react';
import Context from '../../context';
import { container, point } from './styles';

function SnapPointDebugger() {
  const [state] = useContext(Context);
  const { debug, snapPoints } = state;

  return useMemo(
    () =>
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
