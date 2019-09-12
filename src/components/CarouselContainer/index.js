import React, { useCallback, useEffect } from 'react';
import { container, containerInner } from './styles';

import useDimensions from '../../hooks/useDimensions';
import CarouselNavigation from '../CarouselNavigation';

function CarouselContainer(props) {
  const {
    carouselWidth,
    cellAlign,
    children,
    debug,
    navigationType,
    responsive,
    setCarouselState,
    snapPoints
  } = props;

  const containerClass = useCallback(container(props), [debug]);
  const containerInnerClass = useCallback(containerInner(props), [cellAlign, debug, snapPoints]);

  // Check whether carousel navigation should be displayed or not
  const hasNav = navigationType !== 'none' && snapPoints.length > 0;

  // Get the dimensions of our container
  const [ref, dimensions] = useDimensions(responsive);

  // Container dimension effect
  useEffect(() => {
    if (Object.getOwnPropertyNames(dimensions).length < 1) return;
    const { width } = dimensions;
    setCarouselState({ carouselWidth: responsive ? width : carouselWidth });
  }, [dimensions]);

  console.log(carouselWidth);

  return (
    <div
      className={containerClass}
      ref={ref}
      style={{ width: !responsive ? parseInt(carouselWidth) : '100%' }}
    >
      <div className={containerInnerClass}>{children}</div>
      {hasNav && <CarouselNavigation {...props} />}
    </div>
  );
}

export default CarouselContainer;
