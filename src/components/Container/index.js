import React, { useCallback, useContext, useEffect } from 'react';
import { container, containerInner } from './styles';
import Context from '../../context';

import useDimensions from '../../hooks/useDimensions';
import Navigation from '../Navigation';

function Container({ children }) {
  const [state, setState] = useContext(Context);

  const {
    cellAlign,
    debug,
    fullWidthPerSlide,
    navigationType,
    responsive,
    sliderWidth,
    snapPoints
  } = state;

  const containerClass = useCallback(container(state), [debug]);
  const containerInnerClass = useCallback(containerInner(state), [cellAlign, debug, snapPoints]);

  // Check whether slider navigation should be displayed or not
  const hasNav = navigationType !== 'none' && snapPoints.length > 0;

  // Get the dimensions of our container
  const [ref, dimensions] = useDimensions(responsive);

  // Container dimension effect
  useEffect(() => {
    if (Object.getOwnPropertyNames(dimensions).length < 1) return;
    const { width } = dimensions;
    const responsiveSliderWidth = responsive ? width : sliderWidth;
    if (fullWidthPerSlide) {
      setState({
        sliderWidth: responsiveSliderWidth,
        widthPerSlide: responsiveSliderWidth
      });
    } else {
      setState({ sliderWidth: responsiveSliderWidth });
    }
  }, [dimensions]);

  return (
    <div
      className={containerClass}
      ref={ref}
      style={{ width: !responsive ? parseInt(sliderWidth) : '100%' }}
      dir={cellAlign === 'left' ? 'ltr' : 'rtl'}
    >
      <div className={containerInnerClass}>{children}</div>
      {hasNav && <Navigation />}
    </div>
  );
}

export default Container;
