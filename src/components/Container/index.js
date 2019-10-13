import React, { useEffect, useCallback, useContext, useMemo, useRef, useState } from 'react';
import Hammer from 'hammerjs';
import { useDidUpdate } from 'react-hooks-lib';
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

  const {
    cellAlign,
    debug,
    isDragging,
    isPannedVertically,
    isPannedHorizontally,
    fullWidthPerSlide,
    responsive,
    sliderWidth,
    snapPoints
  } = state;

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
  usePreventEvtOuside(el, 'touchstart', () => setState({ isDragging: true }));

  useEventListener(
    'touchmove',
    e => {
      e.stopImmediatePropagation();
      if ((isDragging && !isPannedVertically) || (isDragging && isPannedHorizontally)) {
        e.preventDefault();
      } else {
        return true;
      }
    },
    window,
    { passive: false }
  );

  useEventListener('touchend', () =>
    setState({ isDragging: false, dragEnabled: canDrag, isPannedVertically: false })
  );

  /**
   * Handler for our hammerjs
   * @param {*} e
   */
  const handler = e => {
    const angle = Math.floor(e.angle);

    if (angle >= 60 && angle <= 140) {
      setState({ isPannedVertically: true, dragEnabled: false });
      return;
    } else if (angle <= -60 && angle >= -140) {
      setState({ isPannedVertically: true, dragEnabled: false });
      return;
    }
  };

  /**
   * Create touch action using hammerjs
   */
  useEffect(() => {
    if (!el) return;

    const mc = new Hammer(el, {
      touchAction: 'pan-y',
      recognizers: [[Hammer.Pan, { direction: Hammer.DIRECTION_VERTICAL }]]
    });

    mc.on('panstart', handler);
  }, [el]);

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
