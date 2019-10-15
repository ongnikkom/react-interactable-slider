import React, { useContext, useMemo, useRef } from 'react';
import ZingTouch from 'zingtouch';
import { useDidUpdate } from 'react-hooks-lib';
import { container, containerInner } from './styles';
import useDimensions from '../../hooks/useDimensions';
import Context from '../../context';
import Navigation from '../Navigation';
import usePreventDragConflicts from '../../hooks/usePreventDragConflicts';
import usePreventEvtOuside from '../../hooks/usePreventEvtOutside';
import useEventListener from '../../hooks/useEventListener';

let interactionStart,
  panStarted = false,
  threshold = 4,
  pannedDirection = null;

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
  usePreventEvtOuside(el, 'touchstart', e => {
    setState({ dragEnabled: false });
    panStarted = true;
    interactionStart = +new Date();
  });

  useEventListener('touchend', () => {
    pannedDirection = null;
    panStarted = false;
    interactionStart = null;
  });

  // Disable touch scroll depending below condition
  useEventListener(
    'touchmove',
    e => {
      if (interactionStart) {
        const delta = +new Date() - interactionStart;
        if (delta > threshold) {
          if (pannedDirection === 'right' || pannedDirection === 'left') {
            e.preventDefault();
            setState({ dragEnabled: canDrag });
          }
        }
      }
    },
    window,
    { passive: false }
  );

  const handler = e => {
    if (!panStarted) {
      return;
    }

    let angle = e.detail.data[0].directionFromOrigin;

    if ((angle >= 315 && angle <= 360) || (angle <= 45 && angle >= 0)) {
      pannedDirection = 'right';
    } else if (angle >= 135 && angle <= 225) {
      pannedDirection = 'left';
    } else if (angle <= 135) {
      setState({ dragEnabled: false });
      pannedDirection = 'up';
    } else {
      setState({ dragEnabled: false });
      pannedDirection = 'down';
    }

    panStarted = false;
  };

  useDidUpdate(() => {
    const region = new ZingTouch.Region(el, true, false);
    region.bind(el, 'pan', handler);
    return () => region.unbind(el, 'pan', handler);
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
