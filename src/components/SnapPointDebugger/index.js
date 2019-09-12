import React from 'react';
import { container, point } from './styles';

function SnapPointDebugger({ snapPoints = [], debug }) {
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
