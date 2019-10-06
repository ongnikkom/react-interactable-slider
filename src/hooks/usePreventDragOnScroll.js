import { useCallback, useState } from 'react';
import PanResponder from 'react-panresponder-web';
import useEventListener from './useEventListener';

function usePreventDragOnScroll([state, setState]) {
  const { forceDragEnabled, isDragging } = state;
  const [scrollable, setScrollable] = useState(false);
  const [pageY, setPageY] = useState(0);

  const panResponder = useCallback(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (gestureState.dx > 3 || gestureState.dx < -3) setState({ isDragging: true });
        return false;
      }
    })
  );

  let timer;
  const handleScrollEvent = useCallback(
    e => {
      switch (e.type) {
        case 'mousewheel':
        case 'scroll':
          clearTimeout(timer);
          setState({ dragEnabled: false });
          timer = setTimeout(() =>
            setState({ dragEnabled: forceDragEnabled !== null ? forceDragEnabled : true })
          );
          break;
        default: {
          const currentY = e.touches[0].pageY;
          if (Math.abs(currentY - pageY) < 10) return;
          setScrollable(true);
          setPageY(currentY);
        }
      }

      if (!scrollable && e.type === 'touchmove') e.preventDefault();
    },
    [isDragging, pageY, scrollable]
  );

  const touchStartHandler = useCallback(e => setPageY(e.touches[0].pageY), []);
  const touchMoveHandler = useCallback(handleScrollEvent, [isDragging, pageY, scrollable]);
  const scrollHandler = useCallback(handleScrollEvent, [isDragging, pageY, scrollable]);

  useEventListener('touchstart', touchStartHandler, window, { passive: false });
  useEventListener('touchmove', touchMoveHandler, window, { passive: false });
  useEventListener('scroll', scrollHandler, window, { passive: false });
  useEventListener('mousewheel', scrollHandler, window, { passive: false });

  return [panResponder];
}

export default usePreventDragOnScroll;
