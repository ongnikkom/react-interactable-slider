import React, { useCallback, useEffect } from 'react';
import { container, containerInner } from './styles';

import useDimensions from '../../hooks/useDimensions';
import Navigation from '../Navigation';

function Container(props) {
  const {
    cellAlign,
    children,
    debug,
    navigationType,
    responsive,
    setSliderState,
    sliderWidth,
    snapPoints
  } = props;

  const containerClass = useCallback(container(props), [debug]);
  const containerInnerClass = useCallback(containerInner(props), [cellAlign, debug, snapPoints]);

  // Check whether slider navigation should be displayed or not
  const hasNav = navigationType !== 'none' && snapPoints.length > 0;

  // Get the dimensions of our container
  const [ref, dimensions] = useDimensions(responsive);

  // Container dimension effect
  useEffect(() => {
    if (Object.getOwnPropertyNames(dimensions).length < 1) return;
    const { width } = dimensions;
    setSliderState({ sliderWidth: responsive ? width : sliderWidth });
  }, [dimensions]);

  return (
    <div
      className={containerClass}
      ref={ref}
      style={{ width: !responsive ? parseInt(sliderWidth) : '100%' }}
    >
      <div className={containerInnerClass}>{children}</div>
      {hasNav && <Navigation {...props} />}
    </div>
  );
}

export default Container;
