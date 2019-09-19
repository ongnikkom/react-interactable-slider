import React, { useContext } from 'react';
import { container, point } from './styles';
import Context from '../../context';

function SnapPointDebugger() {
  const [state] = useContext(Context);
  const { debug, snapPoints } = state;

  if (snapPoints.length < 1 || !debug) return null;

  return (
    <div className={container}>
      {snapPoints.map(({ x }, i) => (
        <div className={point} key={i} style={{ left: -x }} />
      ))}
    </div>
  );
}

export default SnapPointDebugger;
