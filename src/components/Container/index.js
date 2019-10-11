import React, { useEffect, useCallback, useContext, useMemo, useRef, useState } from 'react';
import Hammer from 'hammerjs';
import { useDidMount, useDidUpdate } from 'react-hooks-lib';
import { container, containerInner } from './styles';
import useDimensions from '../../hooks/useDimensions';
import Context from '../../context';
import Navigation from '../Navigation';
import usePreventDragConflicts from '../../hooks/usePreventDragConflicts';
import usePreventEvtOuside from '../../hooks/usePreventEvtOutside';
import useEventListener from '../../hooks/useEventListener';

function Container({ children }) {
  const {
    propsToState: [state, setState],
    userProps
  } = useContext(Context);

  const containerRef = useRef();

  const { cellAlign, debug, fullWidthPerSlide, responsive, sliderWidth, snapPoints } = state;

  const direction = cellAlign === 'left' ? 'ltr' : 'rtl';

  const containerClass = useMemo(() => container(state), [debug]);
  const containerInnerClass = useMemo(() => containerInner(state), [cellAlign, debug, snapPoints]);
  const memoizedWidth = useMemo(() => (!responsive ? parseInt(sliderWidth) : '100%'), [
    sliderWidth
  ]);

  const [ref, dimensions] = useDimensions(responsive);

  usePreventDragConflicts(containerRef);

  // The element for the react native interactable
  const el = containerRef.current && containerRef.current.firstChild;

  // We want to be able to force the dragEnabled state
  // depending on the config of the user
  const canDrag = userProps.dragEnabled && snapPoints.length > 0;

  /**
   * Creating mobile touch behavior
   * 1. When user starts dragging the slider the scroll should be disabled
   * 2. When user starts scrolling the dragging of the slider should be disabled
   */
  useEventListener('scroll', () => setState({ dragEnabled: false }));
  usePreventEvtOuside(el, 'touchstart', () => setState({ dragEnabled: canDrag }));

  /**
   * We wrap it using useDidUpdate because we want to get
   * the value after the DOM loads
   */
  useDidUpdate(() => {
    const { width } = dimensions;
    setState({ sliderWidth: responsive ? width : sliderWidth });
  }, [dimensions, fullWidthPerSlide]);

  return (
    <div ref={ref} style={{ width: memoizedWidth }} className={containerClass} dir={direction}>
      <div ref={containerRef} className={containerInnerClass}>
        {children}
      </div>
      <Navigation />
    </div>
  );
}

export default Container;
