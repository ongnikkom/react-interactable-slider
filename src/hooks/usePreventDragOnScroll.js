import { useCallback, useState } from 'react';
import PanResponder from 'react-panresponder-web';
import useEventListener from './useEventListener';

function usePreventDragOnScroll([state, setState]) {
  const { dragEnabled, forceDragEnabled, scrollable } = state;
  const [pageY, setPageY] = useState(0);

  const panResponder = useCallback(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        if (forceDragEnabled) setState({ dragEnabled: forceDragEnabled, scrollable: false });
        return false;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (gestureState.dx > 3 || gestureState.dx < -3) {
          // do nothing
        } else if (gestureState.dy > 3 || gestureState.dy < -3) {
          setState({ dragEnabled: false, scrollable: true });
        }
        return false;
      }
    }),
    [dragEnabled, forceDragEnabled, scrollable]
  );

  const handleScrollEvent = useCallback(
    e => {
      if (e.type === 'touchstart') {
        const currentY = e.touches[0].pageY;
        if (Math.abs(currentY - pageY) < 3) e.preventDefault();
      }

      if (!scrollable) e.preventDefault();
    },
    [dragEnabled, pageY, scrollable]
  );

  const touchStartHandler = useCallback(e => setPageY(e.touches[0].pageY), []);
  const touchMoveHandler = useCallback(handleScrollEvent, [scrollable]);
  const scrollHandler = useCallback(handleScrollEvent, [scrollable]);

  useEventListener('touchstart', touchStartHandler, window, { passive: false });
  useEventListener('touchmove', touchMoveHandler, window, { passive: false });
  useEventListener('scroll', scrollHandler, window, { passive: false });
  useEventListener('mousewheel', scrollHandler, window, { passive: false });

  return [panResponder];
}

export default usePreventDragOnScroll;
